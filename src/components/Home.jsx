import { Container } from "react-bootstrap";
import "./Home.scss";
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
          <li>Commit và đẩy source code lên github public.</li>
          <li>Triển khai website lên Heroku để demo.</li>
        </ul>
      </section>

      {/* <section>
        <h2>Yêu cầu backend (optional - không bắt buộc):</h2>
        <p>
          Sử dụng python django rest framework, tạo các api như trên trang web:{" "}
          <a href="https://reqres.in/">https://reqres.in/</a>
        </p>
      </section> */}
      <section>
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

      <section className="mt-3">
        <h2>Advance: using redux</h2>
        <ol>
          <li>
            Setup env:
            <ul>
              <li>Hello world with react</li>
              <li>Push code to Github</li>
            </ul>
          </li>
          <li>Phân tích yêu cầu các chức năng cần làm</li>
          <li>
            Design giao diện Header
            <ul>
              <li>Setup Bootstrap 5, SASS, Axios</li>
              <li>
                Sử dụng Component Nav của Bootstrap tạo giao diện responsive
              </li>
            </ul>
          </li>
          <li>
            Hiển thị List Users
            <ul>
              <li>Sử dụng Axios để gọi APIs</li>
              <li>
                Sử dụng Table Bootstrap và State React để render List User
              </li>
            </ul>
          </li>
          <li>Customize axios</li>
          <li>Giải thích cơ chế phân trang: pagination</li>
          <li>Tích hợp component phân trang</li>
          <li>Tạo modal Thêm người dùng</li>
          <li>Tích hợp APIs create users</li>
          <li>Actions in Table (edit/delete). Tạo Model Edit users</li>
          <li>Tích hợp Apis edit users</li>
          <li>Tạo modal confirm</li>
          <li>Tích hợp Apis delete users</li>
          <li>
            Design sort header
            <ul>
              <li>Tich hop frontawesome 6</li>
              <li>Css header</li>
              <li>Onclick, base state react</li>
            </ul>
          </li>
          <li>
            Filter users by id/email
            <ul>
              <li>Input search</li>
              <li>Handler filter</li>
              <li>Lodash debounce</li>
            </ul>
          </li>
          <li>Install library/how to read docs (excel)</li>
          <li>Design giao diện import/export</li>
          <li>Export data</li>
          <li>Import data</li>
          <li>
            Design App layout
            <ul>
              <li>Page layout</li>
              <li>React router dom version 6</li>
            </ul>
          </li>
          <li>Design Login</li>
          <li>Apis Login</li>
          <li>Handle login error</li>
          <li>
            Usecontext
            <ul>
              <li>Fixed Header</li>
            </ul>
          </li>
          <li>Private routes</li>
          <li>Fix lỗi Hot Reloading react</li>
          <li>
            Fix giao diện
            <ul>
              <li>router not found</li>
              <li>Trim email, enter login</li>
              <li>Responsive mobile</li>
            </ul>
          </li>
          <li>Deploy to Heroku</li>
          <li>Setup redux (checkout new branch)</li>
          <li>Remove useContext</li>
          <li>Add error boundary</li>
          <li>What do they expect ???</li>
        </ol>
      </section>
    </Container>
  );
};
export default Home;
