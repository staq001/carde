CREATE TABLE `cards` (
	`id` varchar(36) NOT NULL DEFAULT (uuid()),
	`name` varchar(255) NOT NULL,
	`description` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `cards_id` PRIMARY KEY(`id`)
);
