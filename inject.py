import frida
import sys

TARGET = 'com.example'
SCRIPT = 'android_enumerate_jvm'
SPAWN = False

with open(SCRIPT + '.js', 'r') as f:
	r = f.read()

def on_message(message, data):
	print(message)

device = frida.get_usb_device(1)

if SPAWN:
	process = device.spawn(TARGET)
	session = device.attach(process)
else:
	session = device.attach(TARGET)

script = session.create_script(r)
script.on('message', on_message)
script.load()

if SPAWN:
	device.resume(process)

sys.stdin.read()
