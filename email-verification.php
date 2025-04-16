<?php
// Configuration pour l'API d'envoi d'email via Mailjet

// Définir les headers pour permettre les requêtes AJAX (CORS)
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Si la requête est une option (pré-vol CORS), simplement répondre avec 200 OK
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Récupérer les données envoyées
$data = json_decode(file_get_contents('php://input'), true);

// Vérifier les données requises
if (!isset($data['email']) || !isset($data['verificationCode'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Données manquantes'
    ]);
    exit;
}

$email = $data['email'];
$verification_code = $data['verificationCode'];

// Valider le format de l'email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Format d\'email invalide'
    ]);
    exit;
}

// Stocker en session
session_start();
$_SESSION['verification_code'] = $verification_code;
$_SESSION['verification_email'] = $email;

// Données pour l'API Mailjet
$apiKey = 'a2257a1a33fc3affd983d72f109a5fd8';    // Remplacez par votre clé API Mailjet
$apiSecret = '9d03dc3d68495f12e218d0d0e40498b1'; // Remplacez par votre secret API Mailjet
$fromEmail = 'alexis.clerc@ynov.com';
$fromName = 'Alchimie Organique';
$subject = 'Code de vérification - Alchimie Organique';

// Construction du message HTML
$emailContent = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #9370DB; }
        .code { text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 3px; margin: 30px 0; color: #9370DB; }
        .note { background-color: #f8f8f8; padding: 15px; border-radius: 5px; font-size: 14px; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Alchimie Organique</h1>
            <p>Vérification de votre adresse email</p>
        </div>
        
        <p>Bonjour,</p>
        
        <p>Voici votre code de vérification pour accéder au calendrier de réservation d\'Alchimie Organique :</p>
        
        <div class="code">' . $verification_code . '</div>
        
        <p>Ce code expirera dans 15 minutes. Si vous n\'avez pas demandé ce code, vous pouvez ignorer cet email.</p>
        
        <div class="note">
            <strong>Note :</strong> Ce message est envoyé automatiquement, merci de ne pas y répondre.
        </div>
        
        <div class="footer">
            <p>&copy; ' . date('Y') . ' Alchimie Organique - Tous droits réservés</p>
        </div>
    </div>
</body>
</html>';

// Configuration de la requête à l'API Mailjet
$mailjetEndpoint = 'https://api.mailjet.com/v3.1/send';
$data = [
    'Messages' => [
        [
            'From' => [
                'Email' => $fromEmail,
                'Name' => $fromName
            ],
            'To' => [
                [
                    'Email' => $email
                ]
            ],
            'Subject' => $subject,
            'HTMLPart' => $emailContent
        ]
    ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $mailjetEndpoint);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Basic ' . base64_encode($apiKey . ':' . $apiSecret)
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Vérifier si l'email a été envoyé avec succès
if ($httpCode == 200 || $httpCode == 201) {
    echo json_encode([
        'success' => true,
        'message' => 'Email envoyé avec succès'
    ]);
} else {
    // Si l'email ne peut pas être envoyé, utiliser le mode simulation
    echo json_encode([
        'success' => true,
        'message' => 'Mode simulation activé - Impossible d\'envoyer l\'email',
        'simulation' => true,
        'code' => $verification_code
    ]);
} 