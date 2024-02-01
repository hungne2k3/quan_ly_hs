// http://localhost:3000/student
var student = 'http://localhost:3000/student';

// viet ham chay
function start() {
    // getStudent(function (callBack) {
    //     renderStudent(callBack)
    // }) // có thể viết như này

    getStudent(renderStudent);
    handleCreateStudent();
}

// goi ham
start();

function getStudent(callBack) {
    fetch(student)
        .then(function (reponse) {
            return reponse.json()
        })
        .then(callBack); // dung callBack goi lai ham
}

function createStudent(data, callBack) {
    var option = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }

    fetch(student, option)
        .then(function (reponse) {
            return reponse.json();
        })
        .then(callBack);
}

// ham xoa
function handleDeleteStudent(id) {
    var option = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

    fetch(student + '/' + id, option)
        .then(function (reponse) {
            return reponse.json();
        })
        .then(callBack);
}

// ham uppdate
function handleUpdateStudent(id, data, callBack) {
    var option = {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }

    fetch(student + '/' + id, option)
        .then(function (reponse) {
            return reponse.json();
        })
        .then(callBack);
}

function uppdateStudent(id) {
    // lấy ra các id của element
    var masv = document.querySelector('.masv-' + id);
    var name = document.querySelector('.name-' + id);
    var date = document.querySelector('.date-' + id);
    var address = document.querySelector('.address-' + id);
    var phoneNumber = document.querySelector('.phone-number--' + id);
    var input = document.querySelector('.input-' + id);
    var btn = document.getElementById('create');

    var masvInput = document.querySelector('input[name="masv"]');
    var nameInput = document.querySelector('input[name="fullname"]');
    var dateInput = document.querySelector('input[name="date"]');
    var addressInput = document.querySelector('input[name="address"]');
    var phoneNumberInput = document.querySelector('input[name="phoneNumber"]');
    var inputBock = document.querySelector('input[name="input"]');

    // kiểm tra để đảm bảo rằng tất cả các biến (masv, name, date, phoneNumber, input) đã được khai báo và không phải là giá trị null hoặc rỗng.
    if (masv && name && date && phoneNumber && input) {
        masvInput.value = masv.innerText;
        nameInput.value = name.innerText;
        dateInput.value = date.innerText;
        addressInput.value = address.innerText;
        phoneNumberInput.value = phoneNumber.innerText;
        inputBock.value = input.innerText;
        // khi cikc vào sửa thì nút "Create" sẽ chuyển Thành "Save"
        btn.innerHTML = 'Save';
    }

    btn.onclick = function () {
        // cập nhập lại form
        var updateForm = {
            masv: masvInput.value,
            name: nameInput.value,
            date: dateInput.value,
            address: addressInput.value,
            phoneNumber: phoneNumberInput.value,
            input: inputBock.value
        }

        // gọi lại hàm với các tham số: id, data, callback
        handleUpdateStudent(id, updateForm, function () {
            getStudent(renderStudent); // gọi lại hàm
        })

        // sau khi cick vào "Save" thì sẽ chuyển lại thành "Create" và sẽ clean input
        btn.innerText = 'Create';
        masvInput = '';
        nameInput = '';
        dateInput = '';
        addressInput = '';
        phoneNumberInput = '';
        inputBock = '';
    }
}

// render ra trinh duyet
function renderStudent(students) {
    var tableStudent = document.getElementById('table-student');

    tableStudent.innerHTML = '';

    var headerRow = `
        <tr>
            <th>ID</th>
            <th>Mã Sinh Viên</th>
            <th>Họ và tên</th>
            <th>Ngày Sinh</th>
            <th>Địa Chỉ</th>
            <th>Số Điện Thoại</th>
            <th>Đầu Vào</th>
            <th>UpDate</th>
        </tr>
    `;

    tableStudent.innerHTML = headerRow;

    var studentRows = students.map(function (student) {
        return `
            <tr>
                <td class="id-${student.id}">${student.id}</td>
                <td class="masv-${student.id}">${student.masv}</td>
                <td class="name-${student.id}">${student.name}</td>
                <td class="date-${student.id}">${student.date}</td>
                <td class="address-${student.id}">${student.address}</td>
                <td class="phone-number--${student.id}">${student.phoneNumber}</td>
                <td class="input-${student.id}">${student.input}</td>

                <td>
                    <button class="delete" onclick="handleDeleteStudent(${student.id})">Xoa</button>

                    <button class="update" onclick="uppdateStudent(${student.id})">Sua</button>
                </td>
            </tr>
            
        `;
    });

    tableStudent.innerHTML += studentRows.join('');
}

// lam chuc nang tao moi sinh vien
function handleCreateStudent() {
    var createBtn = document.getElementById('create');

    createBtn.onclick = function () {
        // lấy giá trí từ input khi ấn vào Create sẽ nhận giá trị từ input
        var masv = document.querySelector('input[name="masv"]').value;
        var name = document.querySelector('input[name="fullname"]').value;
        var date = document.querySelector('input[name="date"]').value;
        var address = document.querySelector('input[name="address"]').value;
        var phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
        var input = document.querySelector('input[name="input"]').value;

        // gửi đi 1 yêu cầu tạo mới 1 cái Create dùng POST sử dụng fetch tạo ra 1 hàm để tạo mới : createCourse();
        var formData = {
            masv: masv,
            name: name,
            date: date,
            address: address,
            phoneNumber: phoneNumber,
            input: input
        }

        createStudent(formData, function () {
            getStudent(renderStudent);
        })
    }
}