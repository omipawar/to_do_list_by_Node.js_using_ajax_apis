function setcookie(name, value)
{
    var nextday = new Date();
    nextday.setDate(nextday.getDate() + 30);
    document.cookie = name + "=" + value + ";expires=" + nextday.toString();
}

function deletecookie(name)
{
    var nextday = new Date();
    nextday.setDate(nextday.getDate() - 30);
    document.cookie = name + "=X;expires=" + nextday.toString();
}


function getcookie(name)
{
    let value = "";
    var cookie = document.cookie;
    var cookies = cookie.split(";");
    console.log(cookies);
    for(let i = 0; i < cookies.length; i++)
    {
        let data = cookies[i].split("=");
        if(data[0].trim() == name)
        {
            value = data[1];                    
        }
    }
    return value;
}