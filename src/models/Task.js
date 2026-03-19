const {DataTypes} = require('sequelize');
const sequelize = require('../db/database');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Идентификатор задачи'
    },
    name: {
        type: DataTypes.ENUM('Низкая', 'Средняя', 'Высокая', 'Очень высокая'),
        allowNull: true,
        defaultValue: 'low',
        validate: {
            args: [['Низкая', 'Средняя', 'Высокая', 'Очень высокая']],
            msg: 'Срочность должна быть: Низкая, Средняя, Высокая, Очень высокая'
        },
        comment: 'Степень срочности задачи.'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Данное поле не может быть пустым.'
            }
        },
        comment: 'Описание задачи'
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        validate: {
            len: [1, 1000],
            msg: 'Слишком много символов.'
        },
        comment: 'Комментарий к задаче.'
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Статус выполнения задачи: выполнено/не выполнено.'
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            msg: {
                isDate: {
                    msg: 'Данное поле должно представлять значение даты.'
                },
                isFuture(date_value) {
                    if (date_value < new Date()) {
                        throw new Error('Невозможно создать задачу с прошедшей датой.')
                    }
                }
            }
        },
        comment: 'Срок задачи.'
    },
    dateOfComplete: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        comment: 'Когда была выполнена задача.'
    }
}, {
    tableName: 'tasks',
    underscored: true,
    timestamps: true,
    getterMethods: {
        isOver() {
            return !this.status && this.deadline < new Date();
        },
        isDone() {
            if (this.status) return 'Задача выполнена в срок.'
            if (this.isOver) return 'Задача просрочена.'
            return 'Задача в работе.';
        },
        formattedDeadline() {
            return this.deadline.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    },
    hooks: {
        beforeUpdate(task) {
            if (task.changed('status') && task.status === true) {
                task.dateOfComplete = new Date();
            }
            if (task.changed('status') && task.status === false) {
                task.dateOfComplete = null;
            }
        }
    },
})

module.exports = Task;