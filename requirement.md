# DeltaTime — Requirements Document

> **DeltaTime** is a modern interactive web magazine that presents in-depth comparisons of **Godot Engine** and **Unity Engine**, focusing on performance, workflow, technical architecture, and benchmark results.

---

## 1. Project Overview

### 1.1 Project Name

**DeltaTime**

### 1.2 Project Type

Interactive technology magazine / benchmark website.

### 1.3 Project Goal

Membangun website editorial interaktif yang membandingkan performa **Godot** dan **Unity** secara visual dan informatif.

Website tidak hanya menampilkan artikel dalam bentuk teks, tetapi juga menggunakan:

* Benchmark visualization
* Interactive comparison
* Animated UI
* Image gallery
* Code snippets
* Performance indicators
* Responsive editorial layout

### 1.4 Target Audience

* Game developers
* Game development students
* Programmers
* Technical artists
* Game engine enthusiasts
* Developers yang sedang membandingkan Godot dan Unity

---

# 2. Content Scope

DeltaTime akan membahas beberapa aspek utama dari Godot dan Unity.

## 2.1 Performance

Benchmark yang dapat ditampilkan:

* Average FPS
* Minimum FPS
* Maximum FPS
* Frame Time
* CPU Usage
* GPU Usage
* RAM Usage
* Loading Time
* Build Size

## 2.2 Rendering

Comparison dapat mencakup:

* Rendering pipeline
* Lighting
* Shadows
* Post-processing
* 2D rendering
* 3D rendering

## 2.3 Engine Architecture

Artikel dapat membahas:

* Scene architecture
* Component systems
* Entity / node structure
* Scripting architecture
* Asset management
* Editor architecture

## 2.4 Developer Experience

Comparison dapat mencakup:

* Editor workflow
* Debugging
* Documentation
* Scripting
* Project setup
* Build workflow

## 2.5 Code Comparison

Contoh kode dapat digunakan untuk membandingkan implementasi sederhana.

Contoh:

```gdscript
func _process(delta):
    position.x += speed * delta
```

vs.

```csharp
void Update()
{
    transform.position += Vector3.right * speed * Time.deltaTime;
}
```

---

# 3. Website Structure

## 3.1 Main Pages

Website terdiri dari:

```text
/
├── Home
├── Reviews
├── Benchmarks
├── Tech Stack
└── Search
```

### Home

Menampilkan:

* Featured article
* Latest reviews
* Featured benchmark
* Engine comparison
* Popular articles

### Reviews

Menampilkan seluruh artikel editorial.

Features:

* Article cards
* Category filtering
* Sorting
* Article preview

### Benchmarks

Menampilkan hasil benchmark secara visual.

Features:

* FPS comparison
* CPU comparison
* Memory comparison
* Loading time
* Interactive benchmark cards

### Tech Stack

Menjelaskan teknologi yang digunakan untuk membuat DeltaTime.

Contoh:

* HTML
* CSS
* JavaScript
* AOS
* Tilt.js

### Search

Memungkinkan user mencari artikel berdasarkan:

* Judul
* Engine
* Category
* Keyword

---

# 4. Navigation

Navbar berada pada bagian atas website.

### Navigation Items

```text
DeltaTime

Latest Reviews
Benchmarks
Tech Stack
Search
```

### Navbar Requirements

* Sticky ketika scrolling
* Responsive
* Active navigation indicator
* Smooth scrolling untuk section dalam halaman
* Mobile navigation menu
* Navbar berubah appearance ketika user melakukan scroll

---

# 5. Homepage Requirements

Homepage harus memiliki struktur editorial seperti majalah teknologi modern.

## 5.1 Hero Section

Hero section menampilkan artikel utama.

Content:

* Category
* Article title
* Short description
* Publication date
* Estimated reading time
* Hero image
* CTA / Read Article

Contoh:

```text
BENCHMARK

Godot vs Unity:
Which Engine Performs Better?

A practical performance comparison between
two popular game engines.

September 18, 2026 · 8 min read

[ Read Review ]
```

---

## 5.2 Featured Article

Menampilkan artikel utama dengan:

* Large image
* Large typography
* Short summary
* Metadata
* Hover interaction

---

## 5.3 Latest Reviews

Grid artikel terbaru.

Setiap card memiliki:

* Thumbnail
* Category
* Title
* Description
* Publication date
* Reading time

---

## 5.4 Featured Benchmark

Section khusus untuk menampilkan benchmark utama.

Contoh:

```text
FPS PERFORMANCE

Godot      ████████████████  142 FPS
Unity      ██████████████    128 FPS
```

Benchmark harus menggunakan visual indicator seperti:

```html
<progress>
```

---

# 6. Article Requirements

Artikel merupakan salah satu komponen utama DeltaTime.

Gunakan semantic HTML:

```html
<article>
```

Setiap artikel harus memiliki:

* Article title
* Category
* Author
* Publication date
* Reading time
* Hero image
* Introduction
* Main content
* Benchmark
* Code example
* Conclusion
* Related articles

---

# 7. Article Metadata

Tanggal publikasi menggunakan:

```html
<time datetime="2026-09-18">
    September 18, 2026
</time>
```

Reading time menggunakan:

```html
<time datetime="PT8M">
    8 min read
</time>
```

Metadata dapat ditampilkan sebagai:

```text
September 18, 2026
8 min read
```

---

# 8. Benchmark System

Benchmark menjadi fitur utama DeltaTime.

## 8.1 Benchmark Data

Setiap benchmark memiliki:

```text
Benchmark Name
Test Environment
Godot Result
Unity Result
Unit
Test Method
```

Contoh:

```text
Benchmark: Average FPS

Godot: 142 FPS
Unity: 128 FPS
Unit: FPS
```

---

## 8.2 Benchmark Visualization

Benchmark harus ditampilkan secara visual.

Contoh:

```text
Average FPS

Godot
████████████████████ 142 FPS

Unity
██████████████████   128 FPS
```

Gunakan:

```html
<progress>
```

untuk indikator visual.

JavaScript digunakan untuk mengatur nilai progress secara dinamis.

---

## 8.3 Benchmark Animation

Ketika benchmark masuk ke viewport:

1. Progress bar berada pada nilai awal.
2. JavaScript mendeteksi visibility.
3. Progress bar melakukan animasi menuju nilai sebenarnya.
4. Angka benchmark ikut melakukan count-up animation.

Contoh:

```text
0 FPS → 142 FPS
```

---

# 9. Interactive Comparison

User dapat membandingkan Godot dan Unity secara langsung.

Contoh UI:

```text
[ GODOT ] [ UNITY ]
```

User dapat memilih engine.

Content yang ditampilkan akan berubah berdasarkan pilihan.

Comparison dapat mencakup:

* Performance
* Memory
* Rendering
* Workflow
* Scripting
* Build size

---

# 10. Code Showcase

Artikel dapat menampilkan contoh kode.

Gunakan:

```html
<code>
```

untuk inline code dan code blocks.

Contoh:

```html
<pre>
<code>
func _process(delta):
    position.x += speed * delta
</code>
</pre>
```

Code block harus memiliki:

* Syntax-like styling
* Copy button
* Language indicator
* Hover interaction

---

# 11. Image Gallery

Gambar di dalam artikel dapat diklik untuk membuka versi resolusi tinggi.

Gunakan:

```html
<dialog>
```

sebagai modal gallery.

### Interaction Flow

```text
User clicks image
        ↓
<dialog> opens
        ↓
High-resolution image displayed
        ↓
User closes dialog
```

Modal harus memiliki:

* Large image
* Close button
* Image caption
* ESC key support
* Click-outside-to-close

---

# 12. Animation System

Website menggunakan animasi untuk meningkatkan interaktivitas.

## 12.1 AOS

Gunakan **AOS (Animate On Scroll)** untuk:

* Fade-in
* Slide-in
* Reveal animation
* Article sections
* Benchmark sections
* Cards

Contoh:

```html
<div data-aos="fade-up">
```

---

## 12.2 Tilt.js

Tilt.js digunakan pada elemen tertentu seperti:

* Featured article card
* Benchmark card
* Engine comparison card
* Tech stack card

Tilt effect harus digunakan secara moderat agar tidak mengganggu readability.

---

# 13. Micro Interactions

Website harus memiliki micro-interactions.

Contoh:

### Buttons

* Hover animation
* Slight movement
* Visual feedback

### Article Cards

* Image zoom
* Card elevation
* Tilt effect

### Navigation
