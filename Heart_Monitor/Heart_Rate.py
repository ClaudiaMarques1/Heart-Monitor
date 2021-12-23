from __future__ import print_function
import qwiic_max3010x
import time
import sys
from urllib.request import urlopen

def millis():
	return int(round(time.time() * 1000))

def runExample():

	print("\nHeart Rate Monitor\n")
	sensor = qwiic_max3010x.QwiicMax3010x()

	if sensor.begin() == False:
		print("The Heart Rate Monitor device isn't connected to the system. Please check your connection", \
			file=sys.stderr)
		return
	else:
		print("The Heart Rate Monitor is connected.")

	print("Place your index finger on the sensor with steady pressure.")

	if sensor.setup() == False:
		print("Device setup failure. Please check your connection", \
			file=sys.stderr)
		return
	else:
		print("Setup complete.")

	sensor.setPulseAmplitudeRed(0x0A) # Turn Red LED to low to indicate sensor is running
	sensor.setPulseAmplitudeGreen(0) # Turn off Green LED

	RATE_SIZE = 4 # Increase this for more averaging.
	rates = list(range(RATE_SIZE)) # list of heart rates
	rateSpot = 0
	lastBeat = 0 # Time at which the last beat occurred
	beatsPerMinute = 0.00
	beatAvg = 0
	samplesTaken = 0 # Counter for calculating the Hz or read rate
	startTime = millis() # Used to calculate measurement rate
	
	while True:
                
		irValue = sensor.getIR()
		samplesTaken += 1
		if sensor.checkForBeat(irValue) == True:
			# We sensed a beat!
			print('BEAT')
			delta = ( millis() - lastBeat )
			lastBeat = millis()	
	
			beatsPerMinute = 60 / (delta / 1000.0)
			beatsPerMinute = round(beatsPerMinute,1)
	
			if beatsPerMinute < 255 and beatsPerMinute > 20:
				rateSpot += 1
				rateSpot %= RATE_SIZE # Wrap variable
				rates[rateSpot] = beatsPerMinute # Store this reading in the array

				# Take average of readings
				beatAvg = 0
				for x in range(0, RATE_SIZE):
					beatAvg += rates[x]
				beatAvg /= RATE_SIZE
				beatAvg = round(beatAvg)
        
		Hz = round(float(samplesTaken) / ( ( millis() - startTime ) / 1000.0 ) , 2)
		if (samplesTaken % 200 ) == 0:
			
			baseURL = 'http://api.thingspeak.com/update?api_key=0FAQVYEJDM82D6IP&field1='
			conn=urlopen(baseURL+str(beatsPerMinute))
			print(conn.read())

			print(\
				'IR=', irValue , ' \t',\
            	'BPM=', beatsPerMinute , '\t',\
            	'Avg=', beatAvg , '\t',\
				'Hz=', Hz, \
				)

			

if __name__ == '__main__':
	try:
		runExample()
	except (KeyboardInterrupt, SystemExit) as exErr:
		print("\nEnding Heart Rate Monitor")
		sys.exit(0)
