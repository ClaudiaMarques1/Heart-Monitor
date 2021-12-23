import firebase_admin
from firebase_admin import credentials, db
import os

cred=credentials.Certificate('heart-monitor-6a6f1-firebase-adminsdk-bgovg-ef0b4bd30b.json')
firebase_admin.initialize_app(cred, {
'databaseURL': 'https://heart-monitor-6a6f1-default-rtdb.firebaseio.com/'
})

ref = db.reference('/')

def push_db(fileLoc, time):

  filename=os.path.basename(fileLoc)

  # Push file reference to txt in Realtime DB
  ref.push({
      'Heart Rate Data': fileLoc,
      'timestamp': time}
  )

if __name__ == "__main__":
    push_db('Data', '12/11/2020 9:00' )
