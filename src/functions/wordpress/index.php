<?php
// Autoload dependencies
require 'vendor/autoload.php';
require 'wp-load.php'; // Load WordPress core

use Bref\Context\Context;
use Bref\Event\Http\HttpRequestEvent;
use Bref\Event\Http\HttpResponse;
use Bref\Runtime\LambdaRuntime;

LambdaRuntime::fromEnvironmentVariable('LAMBDA_TASK_ROOT')
    ->start(function (HttpRequestEvent $event, Context $context): HttpResponse {
        ob_start();
        // Execute WordPress
        wp();
        $output = ob_get_clean();

        return new HttpResponse($output);
    });
