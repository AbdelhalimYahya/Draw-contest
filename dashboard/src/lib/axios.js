import axios from "axios";

const api = axios.create({
    baseURL: "https://api.om-elnour.art",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

// Auth


// POST
// /api/v1/auth/signup

// Parameters
// Try it out
// No parameters

// Request body

// application/json
// Example Value
// Schema
// {
//   "name": "string",
//   "phone": "string",
//   "password": "string"
// }
// Responses
// Code	Description	Links
// 201
// Created

// Media type

// application/json
// Controls Accept header.
// Example Value
// Schema
// {
//   "token": "string",
//   "user": {
//     "id": "string",
//     "name": "string",
//     "phone": "string",
//     "role": "string",
//     "isSubscribed": true
//   }
// }
// No links

// POST
// /api/v1/auth/login

// Parameters
// Try it out
// No parameters

// Request body

// application/json
// Example Value
// Schema
// {
//   "phone": "string",
//   "password": "string"
// }
// Responses
// Code	Description	Links
// 200
// OK

// Media type

// application/json
// Controls Accept header.
// Example Value
// Schema
// {
//   "token": "string",
//   "user": {
//     "id": "string",
//     "name": "string",
//     "phone": "string",
//     "role": "string",
//     "isSubscribed": true
//   }
// }
// No links

// GET
// /api/v1/auth/profile


// Parameters
// Try it out
// No parameters

// Responses
// Code	Description	Links
// 200
// OK

// No links
// Subscription


// POST
// /api/v1/subscription


// Parameters
// Try it out
// No parameters

// Request body

// multipart/form-data
// phone *
// string
// bill *
// string($binary)
// Responses
// Code	Description	Links
// 201
// Created

// No links

// GET
// /api/v1/subscription/pending


// Parameters
// Try it out
// Name	Description
// page
// integer
// (query)
// page
// limit
// integer
// (query)
// limit
// Responses
// Code	Description	Links
// 200
// OK

// No links

// PUT
// /api/v1/subscription/{id}/status


// Parameters
// Try it out
// Name	Description
// id *
// string
// (path)
// id
// Request body

// application/json
// Example Value
// Schema
// {
//   "status": "accepted",
//   "rejectionMessage": "string"
// }
// Responses
// Code	Description	Links
// 200
// OK

// No links
// Dashboard


// GET
// /api/v1/dashboard/stats


// Parameters
// Try it out
// No parameters

// Responses
// Code	Description	Links
// 200
// OK

// No links

// GET
// /api/v1/dashboard/users


// Parameters
// Try it out
// Name	Description
// q
// string
// (query)
// q
// page
// integer
// (query)
// page
// limit
// integer
// (query)
// limit
// Responses
// Code	Description	Links
// 200
// OK

// No links

// PUT
// /api/v1/dashboard/users/{id}


// Parameters
// Try it out
// Name	Description
// id *
// string
// (path)
// id
// Request body

// application/json
// Example Value
// Schema
// {
//   "name": "string",
//   "phone": "string"
// }
// Responses
// Code	Description	Links
// 200
// OK

// No links

// GET
// /api/v1/dashboard/site-status


// Parameters
// Try it out
// No parameters

// Responses
// Code	Description	Links
// 200
// OK

// No links

// PUT
// /api/v1/dashboard/site-status


// Parameters
// Try it out
// No parameters

// Request body

// application/json
// Example Value
// Schema
// {
//   "isActive": true
// }
// Responses
// Code	Description	Links
// 200
// OK

// No links
