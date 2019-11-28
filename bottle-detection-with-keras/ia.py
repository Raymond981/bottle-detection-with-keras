import numpy as np
from keras.models import Sequential
from keras.layers.core import Dense
from keras.models import model_from_json
import numpy as np
import os
import cv2


def getData():
    ruta = "dataset/"
    archivos = os.listdir(ruta)
    labels = []
    caracteristicas = []
    for archivo in archivos: 
        datos = []
        #print(archivo)
        img = cv2.imread(ruta+archivo)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray,(7,7),255)

        t, dst = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_TRIANGLE)

        canny = cv2.Canny(dst, 50, 150)

        (contornos,_) = cv2.findContours(canny.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        cv2.drawContours(img,contornos,-1,(0,0,255), 2, cv2.LINE_AA)

        (x, y, w, h) = cv2.boundingRect(contornos[-1])

        imagen = cv2.rectangle(img.copy(),(x,y),(x+w,y+h),(0,255,0),2)

        areaCanny = cv2.contourArea(contornos[-1])
        perimetroCanny = cv2.arcLength(contornos[-1],True)
        area = w * h
        perimetro = (2*h+2*w)

        datos.append(areaCanny)
        datos.append(perimetroCanny)
        datos.append(area)
        datos.append(perimetro)
        if(archivo.find("600ml") >= 0):
            labels.append([1, 0])
        elif(archivo.find("lata") >= 0):
            labels.append([0, 1])
        caracteristicas.append(datos)
        #print("Area: ", area, " Perimetro: ", perimetro, " Perimetro Cany: ", perimetroCanny, " Area Canny: ", areaCanny)
    c = np.array(caracteristicas)
    a = np.array(labels)
    return c, a
    
def targetData():
    datos = []
    caracteristicas = []
    img = cv2.imread('2.jpg')
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray,(7,7),255)

    t, dst = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_TRIANGLE)

    canny = cv2.Canny(dst, 50, 150)

    (contornos,_) = cv2.findContours(canny.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    cv2.drawContours(img,contornos,-1,(0,0,255), 2, cv2.LINE_AA)

    (x, y, w, h) = cv2.boundingRect(contornos[-1])

    imagen = cv2.rectangle(img.copy(),(x,y),(x+w,y+h),(0,255,0),2)

    areaCanny = cv2.contourArea(contornos[-1])
    perimetroCanny = cv2.arcLength(contornos[-1],True)
    area = w * h
    perimetro = (2*h+2*w)

    datos.append(areaCanny)
    datos.append(perimetroCanny)
    datos.append(area)
    datos.append(perimetro)

    caracteristicas.append(datos)
    c = np.array(caracteristicas)
    return c

def entrenar():
    # cargamos las 4 combinaciones de las compuertas XOR
    training_data, target_data = getData()

    model = Sequential()
    model.add(Dense(200, input_dim = 4, activation='relu'))
    model.add(Dense(200, activation='relu'))
    model.add(Dense(200, activation='relu'))
    model.add(Dense(2, activation='softmax'))
 
    model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])
 
    model.fit(training_data, target_data, epochs=10000)

    # evaluamos el modelo
    scores = model.evaluate(training_data, target_data)
 
    print("\n%s: %.2f%%" % (model.metrics_names[1], scores[1]*100))
    print (model.predict(targetData()).round())

    # serialize model to JSON
    model_json = model.to_json()
    with open("model.json", "w") as json_file:
        json_file.write(model_json)
    # serialize weights to HDF5
    model.save_weights("model.h5")
    print("Modelo GUARDADO!")

def test():
    training_data, target_data = getData()

    # CARGAMOS EL JSON Y CARGAMOS EL MODELO
    json_file = open('model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)

    # CARGAMOS LOS PESOS EN EL MODELO
    loaded_model.load_weights("model.h5")
    print("Model CARGADO!")


    loaded_model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

    scores = loaded_model.evaluate(training_data, target_data)
 
    print("\n%s: %.2f%%" % (loaded_model.metrics_names[1], scores[1]*100))
    print (loaded_model.predict(targetData()).round())

test()
#[ [12 3 4], [12 8 7], [4 8 9] ] #training

#[ [1 0], [1 0], [0 1] ] #target
