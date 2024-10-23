define('DB_NAME', getenv('DB_NAME'));
define('DB_USER', getenv('DB_USER'));
define('DB_PASSWORD', getenv('DB_PASSWORD'));
define('DB_HOST', getenv('DB_HOST'));
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');
define('WP_CONTENT_DIR', '/mnt/efs/wordpress/wp-content');

define('S3_BUCKET', getenv('S3_BUCKET')); // For handling media uploads
define('FS_METHOD', 'direct'); // Ensure WordPress can write to S3 or EFS
