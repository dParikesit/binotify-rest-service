const soap = require('soap');
const User = require('../models').User;
const url = 'http://soap/subs?wsdl';
const { XMLParser } = require('fast-xml-parser');

const options = {
    ignoreAttributes: false
};
const parser = new XMLParser(options);

let token = {
    apiKey: 'qaJ8sjU1ilXSdnkCUzpIrPExSK4d7UIlr4BZj2EobWfS2yJqHwSlVPMQIQfDx9OWPCNqbagqQeJ3at0BcRhqqpMDiXBBhdXzbTGP3WYNr2aDgwa4tDAMjvuUuNUU72KI',
    clientType: 'REST'
};

const reqSubscribe = async(req, res) => {
    const content = req.body;
    try {
        let client = await soap.createClientAsync(url);
        await client.addSoapHeader(token);
        let result = await client.subscribeAsync(content);
        
        await res.status(200).json(result[0]['return']);
    } catch (error) {
        const err = parser.parse(error["body"]);
        console.log(err['S:Envelope']['S:Body']['S:Fault']['faultstring']);
        
        await res.status(500).json("Subscribe failed");
    }
};

const getPending = async (req, res) => {
    try {
        let client = await soap.createClientAsync(url);
        await client.addSoapHeader(token);
        let result = await client.getPendingAsync({});
        let item = JSON.parse(result[0]['return']);
        const userList = await User.findAll();

        let response = [];

        for (const element of item.records) {
            for (const user of userList) {
                if (element[0] == user['dataValues'].id) {
                    response.push({
                        creator_name: user['dataValues'].name,
                        creator_id: element[0],
                        subscriber_id: element[1]
                    });
                }
            }
        }

        await res.status(200).json(response);
    } catch (error) {
        console.log(error)
        const err = parser.parse(error['body']);
        console.log(err['S:Envelope']['S:Body']['S:Fault']['faultstring']);

        await res.status(500).json({ message: 'Get failed' });
    }
};

const acceptSubscribe = async (req, res) => {
    const content = req.body;
    try {
        let client = await soap.createClientAsync(url);
        await client.addSoapHeader(token);
        let result = await client.acceptAsync(content);
        await res.status(200).json(result[0]['return']);
    } catch (error) {
        const err = parser.parse(error['body']);
        console.log(err['S:Envelope']['S:Body']['S:Fault']['faultstring']);

        await res.status(500).json({ message: 'Accept failed' });
    }
};

const rejectSubscribe = async (req, res) => {
    const content = req.body;
    try {
        let client = await soap.createClientAsync(url);
        await client.addSoapHeader(token);
        let result = await client.rejectAsync(content);
        await res.status(200).json(result[0]['return']);
    } catch (error) {
        const err = parser.parse(error['body']);
        console.log(err['S:Envelope']['S:Body']['S:Fault']['faultstring']);

        await res.status(500).json({ message: 'Reject failed' });
    }
}

const getSubscribe = async (req, res) => {
    const creator_id = parseInt(req.params.creator_id);
    const subscriber_id = parseInt(req.params.subscriber_id);
    try {
        let client = await soap.createClientAsync(url);
        await client.addSoapHeader(token);
        let result = await client.getSubscribeAsync({creator_id, subscriber_id});
        let item = JSON.parse(result[0]['return']);

        await res.status(200).json(item.records);
    } catch (error) {
        const err = parser.parse(error['body']);
        console.log(err['S:Envelope']['S:Body']['S:Fault']['faultstring']);

        await res.status(500).json('Get failed');
    }
}

module.exports = { reqSubscribe, getPending, acceptSubscribe, rejectSubscribe, getSubscribe };
