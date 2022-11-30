const soap = require('soap');
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
        const describe = await client.describe();
        // console.log(describe['SubServiceService']['SubServicePort']);
        let result = await client.getPendingAsync({});
        let item = JSON.parse(result[0]['return']);
        console.log(item)

        await res.status(200).json(item);
    } catch (error) {
        console.log(error)
        const err = parser.parse(error['body']);
        console.log(err['S:Envelope']['S:Body']['S:Fault']['faultstring']);

        await res.status(500).json('Get failed');
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

        await res.status(500).json('Accept failed');
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

        await res.status(500).json('Reject failed');
    }
}

module.exports = { reqSubscribe, getPending, acceptSubscribe, rejectSubscribe };
