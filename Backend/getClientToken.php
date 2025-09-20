<?php
// $client_id = '9e1a0aa17b6f4e059df6bd99b412ef3b';
// $client_secret = '8ee3c0d626ab4c198bbd89c46a50b1ff';

require_once __DIR__ . "/envLoader.php";

// Load .env file from project root
loadEnv(__DIR__ . "/../.env");

// Fetch credentials from environment
$client_id = getenv("API_CLIENT_ID");
$client_secret = getenv("API_CLIENT_SECRET");

if (!$client_id || !$client_secret) {
    echo json_encode(['error' => 'Missing API credentials']);
    exit;
}

$auth = base64_encode($client_id . ':' . $client_secret);
// echo $auth;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://accounts.spotify.com/api/token');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Basic ' . $auth,
    'Content-Type: application/x-www-form-urlencoded'   
]);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
    exit;
}
curl_close($ch);

header('Content-Type: application/json');

echo ($response);
