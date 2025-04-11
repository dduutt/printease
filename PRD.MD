使用tauri element plus JavaScript vue3 sqlite帮我设计一个标签打印程序，页面包括：标签打印、打印记录、模板管理三个页面，通过顶部导航栏切换。因为我不会rust，使用尽量使用tauri提供的插件或api使用JavaScript达到效果,如sql使用@tauri-apps/plugin-sql。
模板管理功能大致为：
1.用户输入模板名称，点击确定后校验该名称是否存在，要求用户选择一个.xlsx文件，rust根据文件路径读取该文件。
2.rust将文件表头
2.前端根据表头生成输入框，label为表头名，placeholder为字段长度1-24。值：span需要用户输入1-24的数字，后续在标签打印页面会根据字段的span控制输入框长度。




模板表：
id:主键
name:模板名称 index
path:模板路径
header:表头 列表数据
fields:字段 json数据
is_used:是否使用

打印记录表：
id:主键
template_id:模板id
content:打印内容 json数据
print_time:打印时间
serial_number:序列号
template_name:模板名称
template_path:模板路径