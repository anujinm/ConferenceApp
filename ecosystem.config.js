module.exports = {
  apps : [{
    name: 'AMSA Backend',
    script: './backend.amsa.mn/server.js',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
		AMSA_FRONTEND_ADDRESS: 'https://localhost:4200',
		AMSA_EMAIL: 'news@amsa.mn',
		AMSA_EMAIL_PASSWORD: 'AmsaAmoxNews123$',
		AMSA_JWT_KEY: '123nfo1ihf12o34i1234o214h213kj41h43iu',
		AMSA_MYSQL_USER: 'amsamn_website_admin',
		AMSA_MYSQL_PASSWORD: 'AmsaIT2019dbPassword',
		AMSA_MYSQL_DATABASE: 'amsamn_website_db',
		AMSA_MYSQL_HOST: 'az1-ss16.a2hosting.com',
		NODE_ENV: 'development',
		AMSA_NODE_ENV: 'development',
		AMSA_PORT: '61004',
		AMSA_FRONTEND_PORT: '61005'
    },
    env_production: {
		AMSA_FRONTEND_ADDRESS: 'https://amsa.mn',
		AMSA_EMAIL: 'news@amsa.mn',
		AMSA_EMAIL_PASSWORD: 'AmsaAmoxNews123$',
		AMSA_JWT_KEY: '123nfo1ihf12o34i1234o214h213kj41h43iu',
		AMSA_MYSQL_USER: 'amsamn_website_admin',
		AMSA_MYSQL_PASSWORD: 'AmsaIT2019dbPassword',
		AMSA_MYSQL_DATABASE: 'amsamn_website_db',
		AMSA_MYSQL_HOST: 'az1-ss16.a2hosting.com',
		NODE_ENV: 'production',
		AMSA_NODE_ENV: 'production',
		AMSA_PORT: '61004',
		AMSA_FRONTEND_PORT: '61005'
    }
  },{
    name: 'Conf Backend',
    script: './conf-backend.amsa.mn/server.js',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
		CONF_FRONTEND_ADDRESS: 'https://localhost:4200',
		CONF_JWT_KEY: '123nfo1ihf12o34i1234o214h213kj41h43iu',
		CONF_MYSQL_USER: 'amsamn_edinstitutes_admin',
		CONF_MYSQL_PASSWORD: 'EdInstitutes2019',
		CONF_MYSQL_DATABASE: 'amsamn_edinstitutes',
		CONF_MYSQL_HOST: 'az1-ss16.a2hosting.com',
		NODE_ENV: 'development',
		CONF_NODE_ENV: 'development',
		CONF_PORT: '61006',
    },
    env_production: {
		CONF_FRONTEND_ADDRESS: 'https://amsa.mn',
		CONF_JWT_KEY: '123nfo1ihf12o34i1234o214h213kj41h43iu',
		CONF_MYSQL_USER: 'amsamn_edinstitutes_admin',
		CONF_MYSQL_PASSWORD: 'EdInstitutes2019',
		CONF_MYSQL_DATABASE: 'amsamn_edinstitutes',
		CONF_MYSQL_HOST: 'az1-ss16.a2hosting.com',
		NODE_ENV: 'production',
		CONF_NODE_ENV: 'production',
		CONF_PORT: '61006',
    }
  }]
};
