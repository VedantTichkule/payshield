CREATE DATABASE IF NOT EXISTS payshield_dev;
use payshield_dev;
set foreign_key_checks=0;
-- 1 users tabel
CREATE TABLE IF NOT EXISTS users(
id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
full_name VARCHAR(100) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password_hash VARCHAR(255) NOT NULL,
role ENUM('CUSTOMER', 'ADMIN', 'AUDITOR') DEFAULT 'CUSTOMER',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
INDEX idx_users_email(email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- wallet table 
CREATE TABLE IF NOT EXISTS wallets(
id bigint unsigned auto_increment primary key,
user_id bigint unsigned  not null,
currency varchar(30) not null default 'USD',
status ENUM ('Active', 'Frozen', 'Closed') default 'Active',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT fk_wallets_users FOREIGN KEY( user_id) references users(id) on delete restrict,
Index idx_wallets_user_id(user_id)
)Engine=InnoDB Default charset=utf8mb4 Collate=utf8mb4_unicode_ci;


-- accounts table
create table if not exists accounts(
id bigint unsigned auto_increment primary key,
wallet_id bigint unsigned null,
account_number varchar(64) not null unique,
name varchar(100) not null,
type enum ('Asset', 'Liability','Equity','Revenue', 'Expense') not null,
created_at timestamp default current_timestamp,
constraint fk_accounts_wallet foreign key (wallet_id) references wallets(id) on delete restrict,
index idx_accounts_wallet_id (wallet_id),
index idx_accounts_type(type)
)engine=InnoDB default charset=utf8mb4 collate =utf8mb4_unicode_ci;


-- Transaction table
create table if not exists transactions(
id bigint unsigned auto_increment primary key,
reference_id varchar(64) not null unique,
description varchar(255) not null,
status enum('pending', 'posted', 'failed', 'reversed') default 'pending',
created_at timestamp default current_timestamp,
posted_at timestamp null,
index idx_transations_ref(reference_id),
index idx_transactions_status(status)
)engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

-- Ledger entries
create table if not exists ledger_entries(
id bigint unsigned auto_increment primary key,
transaction_id bigint unsigned not null,
account_id bigint unsigned not null,
amount decimal(18,4) not null,
direction enum('debit', 'credit') not null,
created_at timestamp default current_timestamp,
constraint fk_entries_transactions Foreign key(transaction_id) references transactions(id) on delete restrict,
constraint fk_entries_account foreign key(account_id) references accounts(id) on delete restrict,
index idx_entries_tx(transaction_id),
index idx_entries_acc(account_id)
)engine=InnoDB Default charset=utf8mb4 collate=utf8mb4_unicode_ci;

set foreign_key_checks=1;