# GuardAI Voice Shield - Native Mobile Deployment Guide (Android & iOS)

Tài liệu hướng dẫn đóng gói và triển khai ứng dụng **GuardAI Voice Shield** lên các thiết bị di động (Android / iOS) sử dụng **Capacitor**.

---

## 1. Kiến trúc Mobile Native
Ứng dụng sử dụng kiến trúc **Hybrid Web Native**:
- **UI Core**: React 19 + TypeScript + Tailwind CSS (Tối ưu hóa Mobile-first cho người cao tuổi, nút bấm lớn $\ge 48\text{px}$, tương phản cao).
- **Native Bridge**: Capacitor 6+ cầu nối tương tác phần cứng:
  - Micro âm thanh ngoài / Speakerphone input.
  - Phản hồi rung xúc giác (Haptic & Vibration Hardware Engine).
  - Push Notification (FCM) nhận cảnh báo nguy cấp từ gia đình.
  - Hỗ trợ chạy ngầm và cảnh báo khi khóa màn hình.

---

## 2. Yêu cầu môi trường phát triển (Prerequisites)

### Dành cho Android:
- **Node.js**: v18+ hoặc v20+
- **Android Studio**: Ladybug / Hedgehog trở lên
- **Java JDK**: OpenJDK 17 hoặc 21
- **Android SDK**: API Level 33, 34 (Android 13, 14)

### Dành cho iOS:
- **macOS**: Sonoma trở lên
- **Xcode**: 15.0+
- **Cocoapods**: `sudo gem install cocoapods`

---

## 3. Quy trình Build & Đóng gói

### Bước 1: Cài đặt Capacitor Dependencies
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios @capacitor/haptics @capacitor/push-notifications @capacitor/splash-screen
```

### Bước 2: Build Web Assets
```bash
npm run build
```

### Bước 3: Khởi tạo Project Android & iOS
```bash
# Thêm nền tảng Android
npx cap add android

# Thêm nền tảng iOS (chạy trên macOS)
npx cap add ios
```

### Bước 4: Đồng bộ Code & Cấu hình vào Native Project
```bash
npx cap sync
```

---

## 4. Cấu hình Quyền Native (Permissions)

### Android (`android/app/src/main/AndroidManifest.xml`):
Thêm các quyền truy cập phần cứng bắt buộc:
```xml
<!-- Quyền ghi âm trực tiếp cuộc gọi loa ngoài -->
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />

<!-- Quyền rung cảnh báo khẩn cấp khi gặp lừa đảo -->
<uses-permission android:name="android.permission.VIBRATE" />

<!-- Quyền kết nối Internet đến Cloud Run backend -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Quyền thông báo đẩy FCM -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

### iOS (`ios/App/App/Info.plist`):
```xml
<key>NSMicrophoneUsageDescription</key>
<string>GuardAI cần quyền sử dụng Micro để nhận diện và phát hiện các dấu hiệu lừa đảo trong cuộc gọi qua loa ngoài theo thời gian thực.</string>

<key>NSSpeechRecognitionUsageDescription</key>
<string>GuardAI sử dụng nhận dạng giọng nói để chuyển nội dung cuộc thoại thành văn bản phân tích rủi ro an ninh.</string>
```

---

## 5. Mở và Chạy trên Thiết bị thật / Máy ảo

### Chạy Android Studio:
```bash
npx cap open android
```
- Kết nối điện thoại Android qua USB (bật *USB Debugging*).
- Nhấn **Run** (Shift + F10) để cài đặt APK trực tiếp lên máy.

### Chạy Xcode (iOS):
```bash
npx cap open ios
```
- Chọn chứng chỉ Developer (Signing Team).
- Chọn iPhone thật hoặc Simulator và nhấn **Build and Run** (Cmd + R).

---

## 6. Xuất bản Release APK / AAB (Google Play Store)

1. Trong Android Studio, chọn menu **Build** > **Generate Signed Bundle / APK**.
2. Chọn **Android App Bundle** (cho Google Play) hoặc **APK** (cài thủ công).
3. Tạo Keystore ký mã bảo mật (Release Keystore).
4. Chọn build variant `release` với cấu hình Proguard/R8 tối ưu hóa kích thước ứng dụng.
