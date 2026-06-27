# Tín Chỉ — Website khóa học online / LMS (ĐỀ14)

> Bài tập lớn môn **Thiết kế Web (INTE03010)** — Trường Đại học Mở TP.HCM, Khoa CNTT
> Giao diện tham khảo: **EduPress — Online Courses & E-Learning** (Figma Community, Free)

## 1. Ý tưởng & định hướng thiết kế

Chủ đề thiết kế: **"Học bạ số"** — lấy cảm hứng từ sổ học bạ / bảng điểm giấy của một trường đại học.
Mỗi khóa học được gắn **mã môn học** kiểu `WEB-301`, mỗi bài học hoàn thành được "đóng dấu" vào học bạ cá nhân, và trang Tiến độ được trình bày như một **bảng điểm thật**.

**Bảng màu (design tokens):**

| Tên | Hex | Vai trò |
|---|---|---|
| Ink Green | `#1F3A2E` | Header, nút chính, tiêu đề |
| Parchment | `#F6F3EC` | Nền trang |
| Mustard | `#D9A441` | Accent, CTA |
| Clay | `#B5482E` | Dấu mộc, cảnh báo, lỗi |
| Charcoal | `#2B2924` | Văn bản |
| Sage | `#B9C4AE` | Viền, đường kẻ |

**Typography:** `Source Serif 4` (display/heading) · `Inter` (body) · `JetBrains Mono` (mã môn học, thời lượng, dữ liệu)

## 2. Cấu trúc 7 trang

| Trang | File | Nội dung chính |
|---|---|---|
| Trang chủ | `index.html` | Hero, lĩnh vực học, khóa học nổi bật (fetch JSON) |
| Danh sách khóa | `courses.html` | Toàn bộ khóa học, lọc theo lĩnh vực/cấp độ, tìm kiếm, sắp xếp |
| Chi tiết khóa | `course-detail.html` | Mô tả, đề cương (accordion), giảng viên, khóa liên quan |
| Trang học | `lesson.html` | Nội dung bài giảng, danh sách bài giảng, đánh dấu hoàn thành |
| Tiến độ cá nhân | `progress.html` | "Bảng điểm" — tiến độ từng khóa đã đăng ký, dấu mộc từng bài |
| Đăng nhập/Đăng ký | `auth.html` | Form có validate, lưu session minh họa bằng localStorage |
| Liên hệ | `contact.html` | Form liên hệ có validate, bản đồ nhúng, FAQ accordion |

## 3. Tính năng JavaScript đã triển khai

1. **Fetch dữ liệu JSON thật** (`assets/data/courses.json`) ở trang chủ, danh sách khóa, chi tiết khóa, trang học, tiến độ — không dùng dữ liệu giả tĩnh hard-code trong HTML.
2. **Lọc & tìm kiếm khóa học** theo lĩnh vực, cấp độ, từ khóa, kèm sắp xếp (phổ biến/đánh giá/thời lượng) — `courses.html`.
3. **Accordion** cho đề cương khóa học, danh sách bài giảng trong trang học, và FAQ.
4. **localStorage**: lưu tiến độ học (`lms_progress_v1`), khóa đã đăng ký (`lms_enrollments_v1`), session đăng nhập (`lms_session_v1`) — cập nhật thanh tiến độ (progress bar) theo thời gian thực.
5. **Validate biểu mẫu** phía client (đăng nhập, đăng ký, liên hệ) với thông báo lỗi rõ ràng, không dùng `alert()`.
6. **Menu mobile (hamburger)**, toast thông báo, điều hướng bài trước/bài sau trong trang học.

## 4. Cách chạy thử cục bộ

Không cần cài đặt gì thêm (HTML/CSS/JS thuần + Tailwind CDN). Chỉ cần phục vụ bằng một static server vì trang dùng `fetch()` (sẽ lỗi CORS nếu mở file trực tiếp bằng `file://`):

```bash
# Cách 1 — Python
cd lms
python3 -m http.server 5500
# Mở http://localhost:5500

# Cách 2 — Node (npx serve)
npx serve lms

# Cách 3 — VS Code: dùng extension "Live Server"
```

## 5. Triển khai (deploy)

Khuyến nghị deploy bằng **GitHub Pages**:

1. Tạo repo, đẩy toàn bộ nội dung thư mục `lms/` lên nhánh `main`.
2. Vào **Settings → Pages**, chọn nguồn là nhánh `main`, thư mục `/ (root)`.
3. Lấy link live dạng `https://<username>.github.io/<repo>/`.

Hoặc deploy bằng **Vercel/Netlify**: kéo thả thư mục `lms/` vào dashboard (không cần bước build vì là static site).

## 6. Ghi chú liêm chính học thuật

- Mã nguồn được tự dựng dựa trên cấu trúc 6 trang gợi ý từ đề bài (Trang chủ · Danh sách khoá · Chi tiết khoá · Trang học · Tiến độ cá nhân · Đăng nhập/Đăng ký · Liên hệ).
- Một phần mã (HTML khung trang, CSS component, logic JS) được soạn với hỗ trợ của công cụ AI (Claude) theo yêu cầu CLO4; toàn bộ đã được rà soát, hiểu rõ luồng hoạt động và có thể chỉnh sửa/giải thích từng phần khi cần.
- Ảnh minh họa lấy từ dịch vụ placeholder công khai [Picsum Photos](https://picsum.photos) — chỉ phục vụ mục đích minh họa giao diện, không phải ảnh thật của khóa học.
- Giao diện tham khảo: **EduPress — Online Courses & E-Learning** (Figma Community, Free) — cần thay bằng ảnh chụp đối chiếu Figma ↔ Web thật trong báo cáo nộp.

## 7. Việc cần làm thêm trước khi nộp (gợi ý cho nhóm)

- [ ] Mở file Figma EduPress, đối chiếu màu/spacing/typography với bản hiện thực hóa này; điều chỉnh nếu cần khớp sát hơn (thiết kế hiện tại đã chọn hướng riêng "Học bạ số" — nên ghi rõ lý do diễn giải lại trong báo cáo).
- [ ] Chụp ảnh đối chiếu Figma ↔ Web cho báo cáo.
- [ ] Chạy Lighthouse (Performance/SEO/Best Practices/Accessibility) và ghi điểm số vào báo cáo.
- [ ] Đẩy lên Git, viết lịch sử commit theo tiến độ thực tế của 3 thành viên.
- [ ] Deploy thật và lấy link live.
- [ ] Quay video demo 5 phút.
