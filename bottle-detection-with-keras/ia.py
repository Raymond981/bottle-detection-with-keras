import numpy as np
from keras.models import Sequential
from keras.layers.core import Dense
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
#        print(archivo)
        img = cv2.imread(ruta+archivo)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray,(7,7),255)

        t, dst = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_TRIANGLE)

        canny = cv2.Canny(dst, 50, 150)

        (contornos,_) = cv2.findContours(canny.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        cv2.drawContours(img,contornos,-1,(0,0,255), 2, cv2.LINE_AA)

        (x, y, w, h) = cv2.boundingRect(contornos[-1])

        imagen = cv2.rectangle(img.copy(),(x,y),(x+w,y+h),(0,255,0),2)
        # W = Ancho
        # H = Alto
        
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
       # target.append( [1, 0] )
#        print("Area: ", area, " Perimetro: ", perimetro, " Perimetro Cany: ", perimetroCanny, " Area Canny: ", areaCanny)
    c = np.array(caracteristicas)
    a = np.array(labels)
    return c, a
    
def targetData():
    datos = []
    caracteristicas = []
    img = cv2.imread('dataset/lata.jpg')
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray,(7,7),255)

    t, dst = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_TRIANGLE)

    canny = cv2.Canny(dst, 50, 150)

    (contornos,_) = cv2.findContours(canny.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    cv2.drawContours(img,contornos,-1,(0,0,255), 2, cv2.LINE_AA)

    (x, y, w, h) = cv2.boundingRect(contornos[-1])

    imagen = cv2.rectangle(img.copy(),(x,y),(x+w,y+h),(0,255,0),2)

    # W = Ancho
    # H = Alto

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
#    cv2.imshow("Umbral", dst)
#    cv2.imshow("Canny", canny)
#    cv2.imshow("Contornos", img)
#    cv2.imshow("Rectangulo", imagen)
#    cv2.waitKey(0)


# cargamos las 4 combinaciones de las compuertas XOR
training_data, target_data = getData()
print(target_data.shape)

print(training_data.shape)

model = Sequential()
model.add(Dense(200, input_dim = 4, activation='relu'))
model.add(Dense(200, activation='relu'))
model.add(Dense(200, activation='relu'))
model.add(Dense(2, activation='softmax'))
 
model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])
 
model.fit(training_data, target_data, epochs=10000)

model.save("export.h5py")

# evaluamos el modelo
scores = model.evaluate(training_data, target_data)
 
print("\n%s: %.2f%%" % (model.metrics_names[1], scores[1]*100))
print (model.predict(targetData()).round())

#[ [12 3 4], [12 8 7], [4 8 9] ] #training

#[ [1 0], [1 0], [0 1] ] #target
