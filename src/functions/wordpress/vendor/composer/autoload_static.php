<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit9e86330407f989a9e1ce45b4bd13cf9a
{
    public static $prefixLengthsPsr4 = array (
        'h' => 
        array (
            'hollodotme\\FastCGI\\' => 19,
        ),
        'S' => 
        array (
            'Symfony\\Component\\Process\\' => 26,
        ),
        'R' => 
        array (
            'Riverline\\MultiPartParser\\' => 26,
        ),
        'P' => 
        array (
            'Psr\\Http\\Server\\' => 16,
            'Psr\\Http\\Message\\' => 17,
            'Psr\\Container\\' => 14,
        ),
        'N' => 
        array (
            'Nyholm\\Psr7\\' => 12,
        ),
        'C' => 
        array (
            'Crwlr\\QueryString\\' => 18,
        ),
        'B' => 
        array (
            'Bref\\' => 5,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'hollodotme\\FastCGI\\' => 
        array (
            0 => __DIR__ . '/..' . '/hollodotme/fast-cgi-client/src',
        ),
        'Symfony\\Component\\Process\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/process',
        ),
        'Riverline\\MultiPartParser\\' => 
        array (
            0 => __DIR__ . '/..' . '/riverline/multipart-parser/src',
        ),
        'Psr\\Http\\Server\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/http-server-handler/src',
        ),
        'Psr\\Http\\Message\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/http-message/src',
            1 => __DIR__ . '/..' . '/psr/http-factory/src',
        ),
        'Psr\\Container\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/container/src',
        ),
        'Nyholm\\Psr7\\' => 
        array (
            0 => __DIR__ . '/..' . '/nyholm/psr7/src',
        ),
        'Crwlr\\QueryString\\' => 
        array (
            0 => __DIR__ . '/..' . '/crwlr/query-string/src',
        ),
        'Bref\\' => 
        array (
            0 => __DIR__ . '/..' . '/bref/bref/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'j' => 
        array (
            'johnpbloch\\Composer\\' => 
            array (
                0 => __DIR__ . '/..' . '/johnpbloch/wordpress-core-installer/src',
            ),
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit9e86330407f989a9e1ce45b4bd13cf9a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit9e86330407f989a9e1ce45b4bd13cf9a::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit9e86330407f989a9e1ce45b4bd13cf9a::$prefixesPsr0;
            $loader->classMap = ComposerStaticInit9e86330407f989a9e1ce45b4bd13cf9a::$classMap;

        }, null, ClassLoader::class);
    }
}
