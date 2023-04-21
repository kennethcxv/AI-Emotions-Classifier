import torch
import torch.nn.functional as F
from torchvision import transforms
import base64
from io import BytesIO
from PIL import Image
import onnxruntime
import numpy as np
import matplotlib.pyplot as plt
import sys


class Inference:
    def __init__(self):
        self.transform = transforms.Compose([transforms.CenterCrop(
            224), transforms.ToTensor()])  # transforms.CenterCrop(100,100)])
        self.ort_session = onnxruntime.InferenceSession(
            "emotion_3080_epoch_128.onnx")
        self.img_shown = True

    def forward(self, image):
        image_data = base64.b64decode(image.split(",")[1])
        img = Image.open(BytesIO(image_data))

        img_transform = np.array(self.transform(img))
        if not self.img_shown:
            Image._show(self.transform(img))
            self.img_shown = True
        # return
#        plt.imshow(img)
#        plt.savefig('output.png')
#        plt.clf()  # Clear the current figurequit()
        img_transform = img_transform.reshape(1, 3, 224, 224)

        ort_inputs = {self.ort_session.get_inputs(
        )[0].name: np.array(img_transform)}
        ort_outs = self.ort_session.run(None, ort_inputs)

        sm = torch.tensor(ort_outs)
        sm = sm.reshape(7, -1)

        ort_outs = F.softmax(sm, dim=0)
        return ort_outs
