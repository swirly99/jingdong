<?php

    // 实现注册功能
    // 1. 连接数据库
    // 2. 接收前端发送的数据
    // 3. 在数据库中查询用户名是否存在 
    //    如果用户名存在 告知结果 并返回 注册页
    //    如果用户名不存在 将用户传入的数据 写入 数据库 并返回 注册成功的信息

    include('./library/conn.php');
    $phone = $_REQUEST['phone'];

    // 查询手机号是否存在
    $sql = "select * from users where phone='$phone'";

    $result = $conn->query($sql);

    if($result->num_rows>0){
        $conn -> close(); // 断开数据库连接
        echo '<script>alert("手机号已存在");</script>';
        echo '<script>location.href="../register.html";</script>';
        die();
    }else{
        echo '<script>alert("手机号可以使用");</script>';
        echo '<script>location.href="../src/html/register.html#/reg";</script>';
    }
    
?>