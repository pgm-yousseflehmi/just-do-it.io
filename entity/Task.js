import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
        name: "Task",
        tableName: "tasks",
        columns: {
            id: {
            primary: true,
            type: "integer",
            generated: true,
            },
            category: {
                type: "varchar",
            },
            task: {
            type: "varchar",
            },
            status: {
            type: "varchar",
            }
        },
        relations: {
            users: {
                target: "User",
                type: "many-to-one",
                joinTable: true,
                cascade: true,
                inverseSide: "Task",
            }
        }
});
