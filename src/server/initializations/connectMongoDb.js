/**
 * Create connection string
 * @param {Object} config - database config
 * @returns
 */
const _createConnectionString = (config) => {
  const {
    instances,
    options,
    database,
    username,
    password,
  } = config;

  const encodedPassword = encodeURIComponent(password);
  const creds = `${username}:${encodedPassword}`;
  const connectionString = `mongodb+srv://${creds}@${instances}/${database}`;

  return options ? `${connectionString}?${options}` : connectionString;
};

/**
 * connect to db
 * @param {object} mongodb - mongodb client
 * @param {object} dbConfig - configuration
 * @param {object} logger - logger
 * @returns {object} client
 */
const connectMongoDb = async (mongodb, dbConfig, logger) => {
  const { MongoClient, ServerApiVersion } = mongodb;
  const connectionString = _createConnectionString(dbConfig);

  logger.info('Connecting to database', dbConfig.instances);

  const client = await MongoClient.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  return {
    db: client.db(dbConfig.database),
    client,
  };
};

export default connectMongoDb;
