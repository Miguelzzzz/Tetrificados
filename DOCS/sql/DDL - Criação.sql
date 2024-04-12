create database BancoFeedBack;

use BancoFeedBack;

Create table feedBack (
nome varchar (40) not null,
notaGeral int not null,
notaJogos int not null,
notaOrganizacao int not null,
notaApresentacao int not null,
notaDecoracao int not null,
compl varchar(200),
codFeed int auto_increment primary key
);
