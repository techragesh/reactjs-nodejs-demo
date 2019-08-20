const express = require('express');
const router = express.Router();
const indy = require('../../indy/index');
const auth = require('../authentication');

router.get('/', function (req, res, next) {
    res.send("Success");
});

router.post('/send_message', auth.isLoggedIn, async function (req, res) {
    let message = JSON.parse(req.body.message);
    console.log("UI Routes send_message------>", message);
    message.did = req.body.did;
    console.log("UI Routes send_message.did------>", message.did);
    await indy.crypto.sendAnonCryptedMessage(req.body.did, message);
    res.redirect('/#messages');
});

router.post('/send_connection_request', auth.isLoggedIn, async function (req, res) {
    let theirEndpointDid = req.body.did;
    console.log("UI Routes send_connection_request--theirendpointDid---->", theirEndpointDid);
    let connectionRequest = await indy.connections.prepareRequest(theirEndpointDid);

    await indy.crypto.sendAnonCryptedMessage(theirEndpointDid, connectionRequest);
    res.redirect('/#relationships');
});

router.post('/issuer/create_schema', auth.isLoggedIn, async function (req, res) {
    console.log("UI Routes issuer/create_schema------>", auth.isLoggedIn);
    console.log("UI Routes issuer/create_schema req.body.name_of_schema------>", req.body.name_of_schema);
    await indy.issuer.createSchema(req.body.name_of_schema, req.body.version, req.body.attributes);
    res.redirect('/#issuing');
});

router.post('/issuer/create_cred_def', auth.isLoggedIn, async function (req, res) {
    console.log("UI Routes issuer/create_cred_def------>", auth.isLoggedIn);
    console.log("UI Routes issuer/create_cred_def rreq.body.tag------>", req.body.tag);
    await indy.issuer.createCredDef(req.body.schema_id, req.body.tag);
    res.redirect('/#issuing');
});

router.post('/issuer/send_credential_offer', auth.isLoggedIn, async function (req, res) {
    console.log("UI Routes issuer/send_credential_offer------>", auth.isLoggedIn);
    console.log("UI Routes issuer/send_credential_offer-req.body.their_relationship_did----->", req.body.their_relationship_did);
    console.log("UI Routes issuer/send_credential_offer-req.body.cred_def_id----->", req.body.cred_def_id);
    await indy.credentials.sendOffer(req.body.their_relationship_did, req.body.cred_def_id);
    res.redirect('/#issuing');
});

router.post('/credentials/accept_offer', auth.isLoggedIn, async function (req, res) {
    let message = indy.store.messages.getMessage(req.body.messageId);
    console.log("UI Routes credentials/accept_offer------>", message);
    indy.store.messages.deleteMessage(req.body.messageId);
    await indy.credentials.sendRequest(message.message.origin, message.message.message);
    console.log("UI Routes credentials/accept_offer message.message.origin------>", message.message.origin);
    console.log("UI Routes credentials/accept_offer message.message.message------>", message.message.message);
    res.redirect('/#messages');
});

router.post('/credentials/reject_offer', auth.isLoggedIn, async function (req, res) {
    indy.store.messages.deleteMessage(req.body.messageId);
    res.redirect('/');
});

router.put('/connections/request', auth.isLoggedIn, async function (req, res) {
    let name = req.body.name;
    let messageId = req.body.messageId;
    let message = indy.store.messages.getMessage(messageId);
    console.log("UI Routes connections/request----name-->", name);
    console.log("UI Routes connections/request----messageId-->", messageId);
    console.log("UI Routes connections/request------>", message);
    indy.store.messages.deleteMessage(messageId);
    await indy.connections.acceptRequest(name, message.message.message.endpointDid, message.message.message.did, message.message.message.nonce);
    res.redirect('/#relationships');
});

router.delete('/connections/request', auth.isLoggedIn, async function (req, res) {
    // FIXME: Are we actually passing in the messageId yet?
    console.log("UI Routes connections/request----delete-->", req.body.messageId);
    if (req.body.messageId) {
        indy.store.messages.deleteMessage(req.body.messageId);
    }
    res.redirect('/#relationships');
});

router.post('/messages/delete', auth.isLoggedIn, function (req, res) {
    console.log("UI Routes messages/delete----delete-->", req.body.messageId);
    indy.store.messages.deleteMessage(req.body.messageId);
    res.redirect('/#messages');
});

router.post('/proofs/accept', auth.isLoggedIn, async function (req, res) {
    console.log("UI Routes proofs/accept--->", req.body.messageId);
    await indy.proofs.acceptRequest(req.body.messageId);
    res.redirect('/#messages');
});

router.post('/proofs/send_request', auth.isLoggedIn, async function (req, res) {
    console.log("UI Routes proofs/send_request--->", req.body.their_relationship_did);
    let myDid = await indy.pairwise.getMyDid(req.body.their_relationship_did);
    console.log("UI Routes proofs/send_request-req.body.proof_request_id-->", req.body.proof_request_id);
    console.log("UI Routes proofs/send_request-req.body.manual_entry-->", req.body.manual_entry);
    await indy.proofs.sendRequest(myDid, req.body.their_relationship_did, req.body.proof_request_id, req.body.manual_entry);
    res.redirect('/#proofs');
});

router.post('/proofs/validate', auth.isLoggedIn, async function (req, res) {
    try {
        let proof = req.body;
        console.log("UI Routes proofs/validate--->", proof);
        if (await indy.proofs.validate(proof)) {
            res.status(200).send();
        } else {
            res.status(400).send();
        }
    } catch (err) {
        res.status(500).send();
    }
});

// For testing serivce
/* GET users listing. */
// router.get('/users', function (req, res, next) {
//     // res.send('respond with a resource');
//     res.json([{
//         id: 1,
//         name: "Hiccup",
//         password: 'hiccup'
//     }, {
//         id: 2,
//         name: "King Arthur",
//         password: 'king-arthur'
//     }]);
// });

module.exports = router;