'use strict';

exports.connectionsRequest = function (message) {
    console.log("messageParsers connetionsRequest message--->", message);
    message.links = {
        accept: {
            href: "/api/connections/request",
            method: "PUT",
            rel: "accept"
        },
        reject: {
            href: "/api/connections/request",
            method: "DELETE",
            rel: "reject"
        }
    };
    message.relationship = {};
    return Promise.resolve(message);
};

exports.connectionsResponse = function (message) {
    console.log("messageParsers connectionsResponse message--->", message);
    message.links = {
        accept: {
            href: "/api/connections/request",
            method: "PUT",
            rel: "accept"
        },
        reject: {
            href: "/api/connections/request",
            method: "DELETE",
            rel: "reject"
        }
    };
    message.relationship = {};
    return Promise.resolve(message);
};