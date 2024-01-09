interface DBConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
    logging: boolean | ((sql: string, timing?: number) => void);
}
declare const _default: {
    development: DBConfig;
    test: DBConfig;
    production: DBConfig;
};
export default _default;
//# sourceMappingURL=config.d.ts.map