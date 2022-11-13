
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
        <?php
           $mysqli = new mysqli("localhost","admin","1234","test");

           $query = "SELECT * FROM skills ";
     
     
           $result = mysqli_query($mysqli, $query);
          while($row = mysqli_fetch_assoc($result)) {
                echo $row['name'];
        ?>
 <table class="style" align="center">
        <tbody>
        <tr>
            <th width="11%">技能名稱</th>
            <th width="8%">技能欄</th>
            <th width="8%">學習費用</th>
            <th width="9%">專屬職業</th>
            <th width="5%">等級</th>
            <th width="10%">所需經驗</th>
            <th width="5%">耗魔</th>
            <th width="44%">詳細分析</th>
        </tr>
 
        <tr>
            <td><?=$row['name']?></td>
            <td>1</td>
            <td><?=$row['cost']?></td>
            <td>劍,騎,斧</td>
            <td>1</td>
            <td>0</td>
            <td>5</td>
            <td style="text-align: left">向敵方1個單位發動攻擊</td>
            </tr>
            <tr>
            <th colspan="4">學習地點</th>
            <td>2</td>
            <td>1800</td>
            <td>10</td>
            <td style="text-align: left">向敵方1~2個單位發動攻擊</td>
            </tr>
            <tr>
            <td colspan="4" rowspan="2">亞紀城民家(40.51)內的蒲田先生<br>
            學習方法請參照任務攻略<a href="Mission1000.htm">月夜殘痕</a></td>
            <td>3</td>
            <td>7200</td>
            <td>15</td>
            <td style="text-align: left">向敵方2個單位發動攻擊</td>
            </tr>
            <tr>
            <td>4</td>
            <td>19800</td>
            <td>20</td>
            <td style="text-align: left">向敵方2~3個單位發動攻擊</td>
            </tr>
            <tr>
            <th colspan="4">說明</th>
            <td>5</td>
            <td>45000</td>
            <td>25</td>
            <td style="text-align: left">向敵方3個單位發動攻擊</td>
            </tr>
            <tr>
            <td colspan="4" rowspan="2">
                <?=$row['descirption']?>
            </td>
            <td>6</td>
            <td>82800</td>
            <td>30</td>
            <td style="text-align: left">向敵方3~4個單位發動攻擊</td>
            </tr>
            <tr>
            <td>7</td>
            <td>133200</td>
            <td>35</td>
            <td style="text-align: left">向敵方4個單位發動攻擊</td>
            </tr>
            <tr>
            <th colspan="4">備註</th>
            <td>8</td>
            <td>183600</td>
            <td>40</td>
            <td style="text-align: left">向敵方4~5個單位發動攻擊</td>
            </tr>
            <tr>
            <td colspan="4" rowspan="2">向左方或中左方發動攻擊時追月只會向左至中的單方發動攻擊。中右及右方將不會受到攻擊。(反方相同)如向中間發動,則最左及最右方的咬位將不會受到攻擊。可以使用技能的只有劍士、騎士與戰鬥斧士。</td>
            <td>9</td>
            <td>246600</td>
            <td>45</td>
            <td style="text-align: left">向敵方5個單位發動攻擊</td>
            </tr>
            <tr>
            <td>10</td>
            <td>322200</td>
            <td>50</td>
            <td style="text-align: left">鴻雁追月 向敵方5~6個單位發動攻擊</td>
        </tr>
      </tbody>
    </table>
        <?php
          }
        ?>
       
</body>
</html>