CREATE DATABASE semillero WITH
OWNER = 'postgres'
ENCODING = 'UTF8';


--Eliminacion de tablas---
DROP TABLE IF EXISTS vehiculo;
DROP TABLE IF EXISTS linea;
DROP TABLE IF EXISTS marca;

--Eliminacion de enumeracion
DROP TYPE IF EXISTS enum_activo_marca;
DROP TYPE IF EXISTS enum_activo_linea;

--Creacion de enumeraciones
CREATE TYPE enum_activo_linea AS ENUM('S','N');
CREATE TYPE enum_activo_marca AS ENUM('S','N');

---Creacion de Tablas-----

CREATE TABLE marca(
    id INTEGER NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    activo enum_activo_marca NOT NULL,
    PRIMARY KEY (id)
);

/*Crear una marca*/
INSERT INTO marca(id,descripcion,activo) VALUES (1,'Kia','S');

CREATE TABLE linea(
    id INTEGER NOT NULL,
    idMarca INTEGER NOT NULL,
    descripcion varchar(255) NOT NULL,
    activo enum_activo_linea NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT kf_idMarca
        FOREIGN KEY (idMarca) REFERENCES marca (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);


/*Se crea una linea Activa*/
INSERT INTO linea(id,idMarca,descripcion,activo) VALUES (1,1,'cerato','S');

/*Se crea una linea inactiva*/
INSERT INTO linea(id,idMarca,descripcion,activo) VALUES (2,1,'carens','N');



CREATE TABLE vehiculo(
    placa VARCHAR(255) NOT NULL,
    modelo INTEGER NOT NULL,
    asientos INTEGER NOT NULL,
    fechaVencimientoSeguro date NOT NULL,
    fechaVencimientoTecnomecanica date NOT NULL,
    idLinea INTEGER NOT NULL,
    PRIMARY KEY (placa),
    CONSTRAINT kf_idLinea
        FOREIGN KEY (idLinea) REFERENCES linea(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);


/*Creacion de vehiculos*/
INSERT INTO vehiculo(placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea)
VALUES ('34KF',2020,4,'2020-12-31','2021-01-20',1);

INSERT INTO vehiculo(placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea)
VALUES ('64KFG',2010,6,'2018-03-15','2020-04-23',1);

INSERT INTO vehiculo(placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea)
VALUES ('84FG7',2015,6,'2017-02-10','2018-04-10',1);

INSERT INTO vehiculo(placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea)
VALUES ('99HYT6',2012,4,'2011-02-10','2016-04-10',2);

INSERT INTO vehiculo(placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea)
VALUES ('GT564',2013,4,'2013-10-12','2018-12-12',2);





