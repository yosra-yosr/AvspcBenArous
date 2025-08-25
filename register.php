
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // الحصول على البيانات من النموذج
    $idNumber = $_POST['idNumber'];
    $idIssueDate = $_POST['idIssueDate'];
    $phone = $_POST['phone'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $fatherName = $_POST['fatherName'];
    $grandFatherName = $_POST['grandFatherName'];
    $motherFirstName = $_POST['motherFirstName'];
    $motherLastName = $_POST['motherLastName'];
    $birthDate = $_POST['birthDate'];
    $gender = $_POST['gender'];
    $maritalstatus = $_POST['maritalstatus'];
    $children = $_POST['children'];
    $profession = $_POST['profession'];
    $fatherphone = $_POST['fatherphone'];
    $region = $_POST['region'];
    $address = $_POST['address'];
    $educationlevel = $_POST['educationlevel'];
    $supportingdocument = $_POST['supportingdocument'];

    // التحقق من البيانات (يمكنك إضافة المزيد من التحقق هنا حسب الحاجة)

    // قاعدة بيانات أو إرسال البريد الإلكتروني هنا، على سبيل المثال:
    // الاتصال بقاعدة البيانات (يرجى تغيير التفاصيل بما يتناسب مع قاعدة بياناتك)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "volunteer_db"; // اسم قاعدة البيانات الخاصة بك

    // إنشاء الاتصال
    $conn = new mysqli($servername, $username, $password, $dbname);

    // التحقق من الاتصال
    if ($conn->connect_error) {
        die("فشل الاتصال بالقاعدة: " . $conn->connect_error);
    }

    // إدخال البيانات إلى قاعدة البيانات
    $sql = "INSERT INTO volunteers (idNumber, idIssueDate, phone, firstName, lastName, fatherName, grandFatherName, motherFirstName, motherLastName, birthDate, gender, maritalstatus, children, profession, fatherphone, region, address, educationlevel, supportingdocument)
    VALUES ('$idNumber', '$idIssueDate', '$phone', '$firstName', '$lastName', '$fatherName', '$grandFatherName', '$motherFirstName', '$motherLastName', '$birthDate', '$gender', '$maritalstatus', '$children', '$profession', '$fatherphone', '$region', '$address', '$educationlevel', '$supportingdocument')";

    if ($conn->query($sql) === TRUE) {
        echo "تم التسجيل بنجاح!";
        // يمكنك توجيه المستخدم إلى صفحة أخرى بعد التسجيل
        header("Location: confirmation.php");
        exit();
    } else {
        echo "خطأ: " . $sql . "<br>" . $conn->error;
    }

    // غلق الاتصال
    $conn->close();
}
?>
