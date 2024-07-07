import { Container } from "react-bootstrap";
import  "./Home.scss";
const Home = () => {
  return (
    <Container>
      <h1 className="mt-5">React User Management App</h1>

      <section>
        <h2>Yêu cầu:</h2>
        <ul>
          <li>
            Sử dụng API từ trang web{" "}
            <a href="https://reqres.in/">https://reqres.in/</a> để tạo website.
          </li>
          <li>
            Sử dụng thư viện React để tạo một màn hình website cơ bản bao gồm
            các chức năng:
            <ol>
              <li>Đăng nhập</li>
              <li>Thêm User</li>
              <li>Sửa User</li>
              <li>Xoá User</li>
              <li>Hiển thị tất cả các User</li>
              <li>Tìm kiếm User theo Id</li>
              <li>Sắp xếp theo FirstName</li>
              <li>Import User từ file .csv</li>
              <li>Export User ra file .csv</li>
            </ol>
          </li>
          <li>
            Tự do tùy chỉnh html, css, để có một website nhẹ nhàng, khoa học và
            đẹp.
          </li>
          <li>Commit và đẩy source code lên github public.</li>
          <li>Triển khai website lên Heroku để demo.</li>
        </ul>
      </section>

      <section>
        <h2>Result</h2>
        <ul>
          <li>Thời gian hoàn thành: 1-3 ngày</li>
          <li>Gửi link Heroku và Github link lại email này</li>
          <li>
            Thời gian phản hồi 2 ngày làm việc kể từ ngày nhận được bài thi.
          </li>
        </ul>
      </section>

      <section>
        <h2>Yêu cầu backend (optional - không bắt buộc):</h2>
        <p>
          Sử dụng python django rest framework, tạo các api như trên trang web:{" "}
          <a href="https://reqres.in/">https://reqres.in/</a>
        </p>
      </section>
      <section >
        <h2>Basic</h2>
        <ol>
          <li>Create git repos, setup git local</li>
          <li>Login. Axios. Store to local storage</li>
          <li>Private routes. Check token</li>
          <li>
            CRUD users
            <ul>
              <li>List users</li>
              <li>Create a user</li>
              <li>Edit a user</li>
              <li>Delete a user</li>
            </ul>
          </li>
          <li>
            Customize list users
            <ul>
              <li>Paginate list user</li>
              <li>Filter by id/email</li>
              <li>Sort by first name</li>
            </ul>
          </li>
          <li>
            Working with excel
            <ul>
              <li>Import excel (read file excel)</li>
              <li>Export excel</li>
            </ul>
          </li>
        </ol>
      </section>
    </Container>
  );
};
export default Home;
