<?php

    // 登录逻辑
    // 1. 连接数据库
    // 2. 接受前端发送的数据
    // 3. 根据前端的数据 进行数据查找
    //    找到数据 ——> 登录成功
    //    未找到数据 ——> 登录失败

    include('./library/conn.php');

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    // 查询语句
    $select = "select * from users where phone='$username' and password='$password'";
    $result = $conn->query($select);
    $select2 = "select * from users where email='$username' and password='$password'";
    $result2 = $conn->query($select2);
    $select3 = "select * from users where username='$username' and password='$password'";
    $result3 = $conn->query($select3);
    $conn->close();
    if($result->num_rows>0||$result2->num_rows>0||$result3->num_rows>0){
        echo '<script>alert("登录成功");</script>';
        echo '<script>location.href="../src/html/index.html";</script>';
    }else{
        echo '<script>alert("用户名或密码错误");</script>';
        echo '<script>location.href="../src/html/login.html";</script>';
   }
    
?>