create database blog;
use blog;


create table role(
	id int primary key not null auto_increment,
    description varchar(200),
    name varchar(200)
);

create table user(
	id int primary key not null auto_increment,
    username varchar(200),
    password varchar(100),
    first_name varchar(200),
    last_name varchar(200)
);

create table user_role(
	id_role int,
    id_user int,
    constraint FK_ROLE foreign key(id_role) references role(id),
    constraint FK_USER foreign key(id_user) references user(id)
);


create table posts(
	id int primary key not null auto_increment,
    title varchar(200),
    content text,
    img_link varchar(100),
    date_publication date,
    id_user int,
    constraint FK_POSTS_USER foreign key(id_user) references user(id)
);

create table tags(
	id int primary key not null auto_increment,
    name varchar(100)
);

create table posts_tags(
	id_posts int,
    id_tags int,
    constraint FK_POSTS foreign key(id_posts) references posts(id),
    constraint FK_TAGS foreign key(id_tags) references tags(id)
);

create table comment(
	id int primary key not null auto_increment,
    content text,
    content_old text,
    date_comment date,
    id_posts int,
    id_user int,
    constraint FK_COMMENT_POSTS foreign key(id_posts) references posts(id),
    constraint FK_COMMENT_USER foreign key(id_user) references user(id)
);

