# import wave
#
# import pyaudio
# from PIL import ImageGrab
# import numpy as np
# import cv2
# from moviepy.editor import *
# import time
# import os
#
# dirpath = '截屏截图'
# if not os.path.exists(dirpath):
#     os.mkdir(dirpath)
#
#
# def captureScreen():
#     '''
#     截屏
#     :return:
#     '''
#     im = ImageGrab.grab()
#     path = os.path.join(dirpath, '截屏_'+str(int(time.time()))+ '.jpg')
#     print('截屏', path)
#     im.save(path, 'JPEG')
#
# def snapShotImg(camera_idx = 0): # camera_idx的作用是选择摄像头。如果为0则使用内置摄像头，比如笔记本的摄像头，用1或其他的就是切换摄像头。
#     '''
#     摄像头拍照
#     :param camera_idx:
#     :return:
#     '''
#     cap = cv2.VideoCapture(camera_idx)
#     ret, frame = cap.read() # cao.read()返回两个值，第一个存储一个bool值，表示拍摄成功与否。第二个是当前截取的图片帧。
#     path = os.path.join(dirpath, '拍照_'+str(int(time.time()))+ '.jpg')
#     print('拍照', path)
#     cv2.imwrite(path, frame) # 写入图片
#     cap.release() # 释
#
# def videoInner():
#     CHUNK = 1024
#     FORMAT = pyaudio.paInt16
#     CHANNELS = 2
#     RATE = 44100
#     WAVE_OUTPUT_FILENAME = "output.wav"
#
#     p = pyaudio.PyAudio()
#     wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
#     wf.setnchannels(CHANNELS)
#     wf.setsampwidth(p.get_sample_size(FORMAT))
#     wf.setframerate(RATE)
#     audio_record_flag = True
#
#     def callback(in_data, frame_count, time_info, status):
#         wf.writeframes(in_data)
#         if audio_record_flag:
#             return (in_data, pyaudio.paContinue)
#         else:
#             return (in_data, pyaudio.paComplete)
#
#     stream = p.open(format=p.get_format_from_width(wf.getsampwidth()),
#                     channels=wf.getnchannels(),
#                     rate=wf.getframerate(),
#                     input=True,
#                     stream_callback=callback)
#     image = ImageGrab.grab()  # 获得当前屏幕
#     width = image.size[0]
#     height = image.size[1]
#     print("width:", width, "height:", height)
#     print("image mode:", image.mode)
#     k = np.zeros((width, height), np.uint8)
#
#     fourcc = cv2.VideoWriter_fourcc(*'XVID')  # 编码格式
#     video = cv2.VideoWriter('test.mp4', fourcc, 9.5, (width, height))
#     # 经实际测试，单线程下最高帧率为10帧/秒，且会变动，因此选择9.5帧/秒
#     # 若设置帧率与实际帧率不一致，会导致视频时间与音频时间不一致
#
#     print("video recording!!!!!")
#     stream.start_stream()
#     print("audio recording!!!!!")
#     record_count = 0
#     while True:
#         img_rgb = ImageGrab.grab()
#         img_bgr = cv2.cvtColor(np.array(img_rgb), cv2.COLOR_RGB2BGR)  # 转为opencv的BGR格式
#         video.write(img_bgr)
#         record_count += 1
#         if (record_count > 200):
#             break
#         print(record_count, time.time())
#
#     audio_record_flag = False
#     while stream.is_active():
#         time.sleep(1)
#
#     stream.stop_stream()
#     stream.close()
#     wf.close()
#     p.terminate()
#     print("audio recording done!!!!!")
#
#     video.release()
#     cv2.destroyAllWindows()
#     print("video recording done!!!!!")
#
#     print("video audio merge!!!!!")
#     audioclip = AudioFileClip("output.wav")
#     videoclip = VideoFileClip("test.mp4")
#     videoclip2 = videoclip.set_audio(audioclip)
#     video = CompositeVideoClip([videoclip2])
#     path = os.path.join(dirpath, '录像_'+str(int(time.time()))+ '.mp4')
#     video.write_videofile(path, codec='mpeg4')