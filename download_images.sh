#!/bin/bash

# User Agent to mimic browser
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
REF="https://www.sawada-yasuhito.com/"

mkdir -p public/images/discography

# ID 1
curl -L -A "$UA" -H "Referer: $REF" -o public/images/discography/disco1.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_1/1355744/678715_411147.jpeg"

# ID 2
curl -L -A "$UA" -H "Referer: $REF" -o public/images/discography/disco2.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_1/1355744/39071_222146.jpg"

# ID 3
curl -L -A "$UA" -H "Referer: $REF" -o public/images/discography/disco3.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_1/1355744/344831_512914.png"

# ID 4
curl -L -A "$UA" -H "Referer: $REF" -o public/images/discography/disco4.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_1/1355744/693941_527525.png"

# ID 5
curl -L -A "$UA" -H "Referer: $REF" -o public/images/discography/disco5.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_1/1355744/3132_926815.png"

# ID 6
curl -L -A "$UA" -H "Referer: $REF" -o public/images/discography/disco6.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_1/1355744/555669_884212.png"

# ID 7
curl -L -A "$UA" -H "Referer: $REF" -o public/images/discography/disco7.jpg "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/1355744/376210_510099.png"

# ID 8
curl -L -A "$UA" -H "Referer: $REF" -o public/images/discography/disco8.jpg "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/412012/w420_h420.YZWG15232_qmqxs1.jpg"

# ID 9 (Already Done, but safe to redo)
curl -L -A "$UA" -H "Referer: $REF" -o public/images/discography/disco9.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/412012/w420_h420.YZWG_15192_njtnzk.jpg"

# ID 10
curl -L -A "$UA" -H "Referer: $REF" -o public/images/discography/disco10.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/412012/w420_h420.YZWG_15144_mcfmwz.jpg"

# ID 11 (Renaming kanpai.jpg to disco11.png for consistency)
curl -L -A "$UA" -H "Referer: $REF" -o public/images/discography/disco11.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/1355744/46487_1681.png"

# Projects
# Project 1 (Already Done)
curl -L -A "$UA" -H "Referer: $REF" -o public/images/project1.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1355744/885733_441078.jpeg"

# Project 2
curl -L -A "$UA" -H "Referer: $REF" -o public/images/project2.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_1/1355744/214543_131713.png"

# Project 3
curl -L -A "$UA" -H "Referer: $REF" -o public/images/project3.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1355744/423079_168428.png"

# ARTS Events (Project 2 Sub-events)
# Nagoya
curl -L -A "$UA" -H "Referer: $REF" -o public/images/project2_nagoya.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1355744/214543_131713.png"

# Higashimatsuyama 1
curl -L -A "$UA" -H "Referer: $REF" -o public/images/project2_higa1.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1355744/22006_270016.png"

# Higashimatsuyama 2
curl -L -A "$UA" -H "Referer: $REF" -o public/images/project2_higa2.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1355744/883720_981285.png"

# Sakado
curl -L -A "$UA" -H "Referer: $REF" -o public/images/project2_sakado.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1355744/34030_621134.png"

# Ozu
curl -L -A "$UA" -H "Referer: $REF" -o public/images/project2_ozu.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1355744/792076_321153.png"

# Real Kayokyoku Project Events
# Isesaki
curl -L -A "$UA" -H "Referer: $REF" -o public/images/project3_isesaki.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1355744/423079_168428.png"

# Niiza
curl -L -A "$UA" -H "Referer: $REF" -o public/images/project3_niiza.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1355744/15193_929892.png"

# Ryugasaki
curl -L -A "$UA" -H "Referer: $REF" -o public/images/project3_ryugasaki.png "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1355744/950674_375475.png"

# Anata no Furusato Concert (2021)
curl -L -A "$UA" -H "Referer: $REF" -o public/images/project_anata_no_furusato.jpg "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1355744/362476_786016.jpg"

echo "Download complete."
