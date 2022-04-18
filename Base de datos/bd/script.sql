DROP TABLE IF EXISTS marca;
DROP TABLE IF EXISTS linea;
DROP TABLE IF EXISTS vehiculo;


CREATE TABLE marca(
id INT UNSIGNED PRIMARY KEY UNIQUE NOT NULL,
descripcion varchar(255) NOT NULL,
activo ENUM ('S','N') NOT NULL
);

CREATE TABLE linea(
    id INTEGER PRIMARY KEY NOT NULL,
    idMarca INT UNSIGNED NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    activo ENUM('S','N') NOT NULL,
    FOREIGN KEY (idMarca) REFERENCES marca(id)
)

CREATE TABLE vehiculo(
    placa VARCHAR(20) PRIMARY KEY NOT NULL,
    modelo ENUM('2010','2011', '2012','2013','2014','2015','2016','2017','2018','2019','2020','2021') NOT NULL,
    asientos INT UNSIGNED NOT NULL,
    fechaVencimientoSeguro DATE NOT NULL,
    fechaVencimientoTecnomecanica DATE NOT NULL,
    idLinea INTEGER NOT NULL,
    FOREIGN KEY (idLinea) REFERENCES linea(id)
)

/*se le agrego un constraint a la FK de vehiculo*/
ALTER TABLE vehiculo  ADD CONSTRAINT fk_linea FOREIGN KEY (idLinea) REFERENCES linea(id)


/*Crear una marca*/
INSERT INTO marca(id,descripcion,activo) VALUES (1,'Kia','S');



/*Se crea una linea Activa*/
INSERT INTO linea(id,idMarca,descripcion,activo) VALUES (1,1,'cerato','S');

/*Se crea una linea inactiva*/
INSERT INTO linea(id,idMarca,descripcion,activo) VALUES (2,1,'carens','N');

/*Creacion de vehiculos*/
INSERT INTO vehiculo(placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea)
VALUES ('34KF','2020',4,'2020-12-31','2021-01-20',1);

INSERT INTO vehiculo(placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea)
VALUES ('64KFG','2010',6,'2018-03-15','2020-04-23',1);

INSERT INTO vehiculo(placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea)
VALUES ('84FG7','2015',6,'2017-02-10','2018-04-10',1);

INSERT INTO vehiculo(placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea)
VALUES ('99HYT6','2011',4,'2011-02-10','2016-04-10',2);

INSERT INTO vehiculo(placa,modelo,asientos,fechaVencimientoSeguro,fechaVencimientoTecnomecanica,idLinea)
VALUES ('GT564','2013',4,'2013-10-12','2018-13-12',2);

/*
select ve.placa, ve.modelo, li.descripcion,ma.descripcion
from((linea li INNER JOIN marca ma ON li.id = ma.id) INNER JOIN vehiculo ve ON ve.idLinea = li.id);
*/