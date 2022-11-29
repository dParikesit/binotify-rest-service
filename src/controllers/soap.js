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

module.exports = { reqSubscribe };
