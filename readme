# 🎵 Lyricify 2.0

A web app that lets you search for any song via the **Spotify API**, view its lyrics, select your favorite lines, and design a beautiful, shareable lyrics card that you can download.  
Built with **HTML, CSS, JavaScript**, and **PHP** for backend API handling.

---

## Live on : https://lyricify.free.nf/

## ✨ Features

- 🔍 Search for songs using the Spotify API
- 📜 View full lyrics for any track
- 🎨 Select favorite lines and generate stylish lyric cards
- 💾 Download or share the lyric cards
- 🚀 Fully containerized & production-ready with automated CI/CD and monitoring

---

## 🛠️ Tech Stack

- **Frontend** → HTML, CSS, JavaScript
- **Backend** → PHP (Spotify token + API calls)
- **CI/CD** → Jenkins (declarative pipeline)
- **Containerization** → Docker + Docker Compose
- **Registry** → AWS ECR (Elastic Container Registry)
- **Hosting** → AWS EC2 (Ubuntu)
- **Monitoring** → Prometheus, Grafana, cAdvisor, Node Exporter

---

## 🚀 CI/CD Pipeline Overview

This project is powered by a Jenkins declarative pipeline (`Jenkinsfile`).  
On every push to the **main branch**, the pipeline does the following:

1. **Checkout Code**  
   Pulls the latest code from GitHub.

2. **Init**  
   Prepares the ECR image URI dynamically.

3. **Build Docker Image**  
   Builds the application Docker image:
   ```bash
   docker build -t <AWS_ACCOUNT_ID>.dkr.ecr.<AWS_REGION>.amazonaws.com/lyricify:<BUILD_NUMBER> .
   ```

---

## 📂 Project Structure

.<br>
├── Backend/<br>
│ ├── envLoader.php<br>
│ └── getClientToken.php<br>
├── Scripts/<br>
│ ├── cardCreation.js<br>
│ ├── changeTheme.js<br>
│ ├── copySelectedSong.js<br>
│ ├── findLyrics.js<br>
│ ├── findSong.js<br>
│ ├── getClickedSongData.js<br>
│ ├── imageDownloader.js<br>
│ ├── imageShare.js<br>
│ └── showNotification.js<br>
├── docker-compose.yml<br>
├── Dockerfile<br>
├── Jenkinsfile<br>
├── prometheus.yml<br>
├── index.html<br>
├── script.js<br>
├── style.css<br>
└── .env

---

## ⚙️ Setup Instructions

### 1. Prerequisites

- AWS Account (with ECR and EC2 set up)
- Docker & Docker Compose
- Jenkins server with:
  - Docker installed
  - AWS CLI installed
  - Jenkins AWS + File credentials configured
- Spotify Developer Account (API credentials)

### 2. Environment Variables

Create a `.env` file in the root:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

In Jenkins, upload this .env file as a file credential (ID: lyricify-env-file).

### 3. AWS Setup

- Create an ECR repository (Can be done with AWS GUI as well):

```bash
aws ecr create-repository --repository-name lyricify
```

- Ensure EC2 has permissions to pull from ECR.

### 4. Run the Pipeline

- Push code to the `main` branch.
- Jenkins will automatically:
  - Build & push image to ECR
  - Deploy updated stack on EC2

## 📊 Monitoring Stack

1. The `docker-compose.yml` brings up the full monitoring ecosystem alongside the web app:
2. Services
   - Lyricify App → PHP + Apache, exposed on port 80
   - Prometheus → Scrapes metrics (`http://<EC2-IP>:9090`)
   - Grafana → Dashboards (`http://<EC2-IP>:3000, default login: admin/ChangeMeNow123`)
   - Node Exporter → EC2 host metrics (`http://<EC2-IP>:9100`)
   - cAdvisor → Container-level metrics (`http://<EC2-IP>:8081`)

## 🔧 Local Development (Optional)

If you want to run the project locally without AWS/Jenkins:

```bash
docker build -t lyricify-local .
docker run -p 8080:80 lyricify-local
```

Visit: http://localhost:8080

## 📊 Grafana Dashboards

To make monitoring easier, you can import pre-built Grafana dashboards for system, container, and application metrics.

### 1. Node Exporter Full (EC2 Host Metrics)

- **Dashboard ID**: `1860`
- Visualizes CPU, RAM, disk, and network stats for your EC2 instance.

### 2. Docker / cAdvisor (Container Metrics)

- **Dashboard ID**: `193`
- Provides CPU, memory, and network usage for each running container.

### 3. Prometheus 2.0 Stats

- **Dashboard ID**: `3662`
- Monitors Prometheus performance itself.

---

### 🚀 How to Import

1. Open Grafana → `http://<EC2-IP>:3000`
2. Login with `admin / ChangeMeNow123` (or your custom password).
3. Go to **Dashboards → Import**.
4. Paste one of the IDs above into the **Grafana.com Dashboard ID** field.
5. Select your **Prometheus data source**.
6. Click **Import**.

You now have ready-made dashboards for:

- 🖥️ EC2 Host health (Node Exporter)
- 📦 Container performance (cAdvisor)
- 📊 Prometheus itself

### 📸 Example Dashboards

####

#### 🖥️ EC2 Host Metrics (Node Exporter)

![Node Exporter Dashboard](docs/Grafana1.jpeg.jpeg)

#### 📦 Container Metrics (cAdvisor)

![cAdvisor Dashboard](docs/Grafana2.jpeg.jpeg)

## 📜 License

Licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by Dibya Sagar

---
