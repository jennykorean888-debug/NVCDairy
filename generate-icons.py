from PIL import Image, ImageDraw, ImageFont
import os

# 创建图标目录（如果不存在）
icon_dir = '.'

# 图标尺寸
icon_sizes = [(192, 192), (512, 512)]

# 图标背景色
background_color = '#4F46E5'  # 主色调
text_color = '#FFFFFF'        # 白色文字

# 创建图标
for size in icon_sizes:
    width, height = size
    
    # 创建空白图像
    image = Image.new('RGB', (width, height), background_color)
    draw = ImageDraw.Draw(image)
    
    # 绘制心形图标（简单版本）
    heart_x = width // 2
    heart_y = height // 2
    heart_size = min(width, height) // 3
    
    # 绘制心形
    draw.polygon([
        (heart_x, heart_y - heart_size // 2),
        (heart_x - heart_size // 2, heart_y),
        (heart_x - heart_size // 4, heart_y + heart_size // 4),
        (heart_x, heart_y + heart_size // 2),
        (heart_x + heart_size // 4, heart_y + heart_size // 4),
        (heart_x + heart_size // 2, heart_y)
    ], fill=text_color)
    
    # 保存图标
    filename = f'icon-{width}x{height}.png'
    filepath = os.path.join(icon_dir, filename)
    image.save(filepath)
    print(f'已生成图标: {filepath}')

print('所有图标生成完成！')