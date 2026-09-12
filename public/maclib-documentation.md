# Maclib UI Library (Modern Edition v2.0)
## Complete Developer Documentation & API Reference (คู่มือการพัฒนาอย่างละเอียด)

> **Maclib** คือ UI Library สไตล์ macOS สำหรับ Roblox Scripting ที่ได้รับการปรับปรุงใหม่ทั้งหมด (Re-engineered Modern Edition v2.0) โดยเพิ่มระบบรองรับ **Mobile & Emulators (MuMu, BlueStacks, LDPlayer, Android, iOS)** อัตโนมัติในระดับ Core Library, ผสานระบบไอคอน Lucide Icons, การจัดการ Memory Leaks ด้วย Maid, ระบบ Dynamic Theme และการปรับแต่งสเกลหน้าจอแบบ Responsive 100%

---

## สารบัญ (Table of Contents)
1. [การติดตั้งและโหลดใช้งาน (Quick Start)](#1-การติดตั้งและโหลดใช้งาน-quick-start)
2. [ระบบสีและธีม (Themes & Accent Colors)](#2-ระบบสีและธีม-themes--accent-colors)
3. [หน้าต่างหลัก (Window Configuration & Methods)](#3-หน้าต่างหลัก-window-configuration--methods)
4. [ระบบกลุ่มและแท็บเมนู (Tab Groups & Tabs)](#4-ระบบกลุ่มและแท็บเมนู-tab-groups--tabs)
5. [ระบบจัดส่วน (Sections)](#5-ระบบจัดส่วน-sections)
6. [องค์ประกอบ UI ทั้งหมด (UI Components Reference)](#6-องค์ประกอบ-ui-ทั้งหมด-ui-components-reference)
   - [Header & Label](#61-header--label)
   - [Button (ปุ่มกด)](#62-button-ปุ่มกด)
   - [Toggle (สวิตช์เปิด-ปิด)](#63-toggle-สวิตช์เปิด-ปิด)
   - [Slider (แถบเลื่อนปรับค่า)](#64-slider-แถบเลื่อนปรับค่า)
   - [Dropdown (เมนูเลือกตัวเลือก)](#65-dropdown-เมนูเลือกตัวเลือก)
   - [Input (กล่องกรอกข้อความ)](#66-input-กล่องกรอกข้อความ)
   - [Keybind (ปุ่มคีย์ลัด)](#67-keybind-ปุ่มคีย์ลัด)
   - [Colorpicker (กล่องเลือกสี)](#68-colorpicker-กล่องเลือกสี)
7. [ระบบบันทึกการตั้งค่า (Configuration & Auto Save System)](#7-ระบบบันทึกการตั้งค่า-configuration--auto-save-system)
8. [ระบบรองรับมือถือและ Emulator อัตโนมัติ (Mobile Engine)](#8-ระบบรองรับมือถือและ-emulator-อัตโนมัติ-mobile-engine)
9. [ตัวอย่างสคริปต์ฉบับสมบูรณ์ (Full Working Example)](#9-ตัวอย่างสคริปต์ฉบับสมบูรณ์-full-working-example)

---

## 1. การติดตั้งและโหลดใช้งาน (Quick Start)

โหลด Maclib ผ่าน HTTP Request บน Executor (Krampus, Solara, Wave, Delta, Fluxus, Hydrogen, Codex, Arceus X, MuMu Player ฯลฯ):

```lua
local MacLib = loadstring(game:HttpGet("https://raw.githubusercontent.com/NongTham/Maclib/main/maclib.lua?" .. tostring(os.time())))()
```

> **💡 เคล็ดลับ:** การเติม `?` ตามด้วย `os.time()` จะช่วยบายพาส Cache ของเซิร์ฟเวอร์ ทำให้ได้เวอร์ชันใหม่ล่าสุดเสมอ

---

## 2. ระบบสีและธีม (Themes & Accent Colors)

Maclib v2.0 มาพร้อมกับชุดสี Accent สำเร็จรูปที่หยิบมาใช้ได้ทันที หรือจะกำหนดเป็น `Color3.fromRGB` เองก็ได้:

```lua
-- พรีเซ็ตสีที่มีให้ใน MacLib.Themes:
MacLib.Themes.Blue      -- Color3.fromRGB(0, 122, 255)  [ค่าเริ่มต้น]
MacLib.Themes.Graphite  -- Color3.fromRGB(142, 142, 147)
MacLib.Themes.Purple    -- Color3.fromRGB(175, 82, 222)
MacLib.Themes.Pink      -- Color3.fromRGB(255, 45, 85)
MacLib.Themes.Red       -- Color3.fromRGB(255, 59, 48)
MacLib.Themes.Orange    -- Color3.fromRGB(255, 149, 0)
MacLib.Themes.Yellow    -- Color3.fromRGB(255, 204, 0)
MacLib.Themes.Green     -- Color3.fromRGB(52, 199, 89)
MacLib.Themes.Cyan      -- Color3.fromRGB(50, 173, 230)
```

---

## 3. หน้าต่างหลัก (Window Configuration & Methods)

### 3.1 การสร้างหน้าต่าง (`MacLib:Window`)

```lua
local Window = MacLib:Window({
    Title = "My Game Hub",
    Subtitle = "v2.0 • by Developer",
    Size = UDim2.fromOffset(860, 580),
    DragStyle = 1,
    DisabledWindowControls = {},
    ShowUserInfo = true,
    Keybind = Enum.KeyCode.RightControl,
    AcrylicBlur = true,
    AccentColor = MacLib.Themes.Blue,
})
```

#### ตารางพารามิเตอร์การตั้งค่า (Settings Table)

| ชื่อตัวเลือก | ชนิดข้อมูล (Type) | ค่าเริ่มต้น (Default) | คำอธิบาย |
|---|---|---|---|
| `Title` | `string` | `"Maclib"` | ชื่อหลักของหน้าต่าง |
| `Subtitle` | `string` | `""` | ข้อความชื่อรอง (อยู่ข้างชื่อหลัก) |
| `Size` | `UDim2` | `UDim2.fromOffset(868, 650)` | ขนาดหน้าต่างเริ่มต้น |
| `DragStyle` | `number` | `1` | `1` = ลากจาก Titlebar/Icon, `2` = ลากได้ทั้งกรอบ Base |
| `DisabledWindowControls`| `table` | `{}` | รายการปุ่มควบคุมหน้าต่างที่ต้องการซ่อน เช่น `{"Close", "Minimize"}` |
| `ShowUserInfo` | `boolean` | `true` | แสดงรูป Avatar และชื่อผู้เล่นที่มุมซ้ายล่าง |
| `Keybind` | `Enum.KeyCode` | `Enum.KeyCode.RightControl` | ปุ่มลัดสำหรับเปิด/ปิดหน้าต่างบนคีย์บอร์ด PC |
| `AcrylicBlur` | `boolean` | `true` | เปิด/ปิด เอฟเฟกต์กระจกเบลอด้านหลัง UI |
| `AccentColor` | `Color3 / string`| `MacLib.Themes.Blue` | สีไฮไลต์หลักของ UI |
| `MobileToggle` | `boolean` | `Auto-detect` | **ตรวจจับอัตโนมัติ**: เป็น `true` บนมือถือ/MuMu และเป็น `false` บน PC |
| `MobileToggleIcon` | `string / number` | `"105412598184757"` | ไอคอนปุ่มลอย (ค่าเริ่มต้นคือโลโก้เรืองแสง) |
| `MobileTogglePosition` | `UDim2` | `UDim2.new(0, 42, 0.5, 0)`| ตำแหน่งเริ่มต้นของปุ่มลอย |
| `AutoAdjustScale` | `boolean` | `true` | ย่อ/ขยายสเกลอัตโนมัติตามขนาดหน้าจออุปกรณ์ |
| `Scale` | `number` | `1` | ตัวคูณขนาดสเกล UI เริ่มต้น |

---

### 3.2 ฟังก์ชันและเมธอดของหน้าต่าง (Window Methods)

#### `Window:Notify(Settings)`
แสดงการแจ้งเตือนสไตล์ Toast ที่มุมขวาล่างของจอ:
```lua
Window:Notify({
    Title = "Notification",
    Description = "ฟังก์ชันทำงานเรียบร้อยแล้ว!",
    Lifetime = 3 -- ระยะเวลาแสดงผล (วินาที)
})
```

#### `Window:Dialog(Settings)`
แสดงกล่องข้อความโต้ตอบ (Modal Dialog) บังคับเลือกยืนยัน/ยกเลิก:
```lua
Window:Dialog({
    Title = "คำเตือน",
    Description = "คุณต้องการรีเซ็ตการตั้งค่าทั้งหมดหรือไม่?",
    Buttons = {
        {
            Name = "ยืนยัน (Confirm)",
            Callback = function()
                print("Confirmed")
            end
        },
        {
            Name = "ยกเลิก (Cancel)",
            Callback = function()
                print("Cancelled")
            end
        }
    }
})
```

#### `Window:SetState(visible: boolean)`
เปิดหรือปิดหน้าต่างโปรแกรม:
```lua
Window:SetState(true)  -- เปิด UI
Window:SetState(false) -- ซ่อน UI
```

#### `Window:GetState(): boolean`
เช็คว่าขณะนี้หน้าต่างกำลังแสดงอยู่หรือไม่

#### `Window:SetAccentColor(color: Color3)`
เปลี่ยนสี Accent Color ทั้งระบบแบบเรียลไทม์:
```lua
Window:SetAccentColor(Color3.fromRGB(255, 80, 80))
```

#### `Window:SetScale(scale: number)`
ปรับอัตราส่วนการขยายของ UI (เช่น `0.8` คือ 80%, `1.0` คือ 100%):
```lua
Window:SetScale(0.85)
```

#### `Window:SetMobileToggle(visible: boolean)`
สั่งแสดงหรือซ่อนปุ่มลอยสำหรับมือถือ:
```lua
Window:SetMobileToggle(false)
```

#### `Window:IsMobile(): boolean`
ส่งค่ากลับ `true` หากผู้เล่นกำลังเล่นบน Android, iOS, แท็บเล็ต หรือ Android Emulator (เช่น MuMu Player)

#### `Window:Unload()`
ทำลาย UI ทั้งหมด คืนค่าแสงเงาในเกม (Lighting Blur) และตัดการเชื่อมต่อ Events ทั้งหมดโดยไม่ให้เกิด Memory Leak:
```lua
Window:Unload()
```

#### `Window.onUnloaded(callback)`
ฮุกฟังก์ชันสำหรับทำงานเมื่อ UI ถูกถอนการติดตั้ง:
```lua
Window.onUnloaded(function()
    print("UI Unloaded Successfully")
end)
```

---

## 4. ระบบกลุ่มและแท็บเมนู (Tab Groups & Tabs)

### 4.1 การสร้าง TabGroup
```lua
local TabGroups = {
    Main = Window:TabGroup()
}
```

### 4.2 การสร้างแท็บ (`TabGroup:Tab`)
```lua
local Tabs = {
    Main     = TabGroups.Main:Tab({ Name = "หน้าหลัก",  Image = "home" }),
    Combat   = TabGroups.Main:Tab({ Name = "ต่อสู้",    Image = "swords" }),
    Visuals  = TabGroups.Main:Tab({ Name = "สายตา/ESP", Image = "eye" }),
    Settings = TabGroups.Main:Tab({ Name = "ตั้งค่า",   Image = "settings" })
}
```

#### การระบุไอคอน (`Image`):
Maclib v2.0 รองรับการใส่ไอคอนได้ 3 รูปแบบ:
1. **Lucide Icon Name (แนะนำ):** ใส่ชื่อไอคอนของ Lucide ได้โดยตรง เช่น `"home"`, `"settings"`, `"crosshair"`, `"sliders"`, `"eye"`, `"shield"`, `"smartphone"`, `"zap"` ฯลฯ
2. **Roblox Asset ID:** เช่น `"rbxassetid://10734950309"` หรือตัวเลข `10734950309`
3. **Sprite Sheet Table:** เช่น `{ Url = "rbxassetid://...", ImageRectOffset = Vector2.new(...), ImageRectSize = Vector2.new(...) }`

### 4.3 ฟังก์ชันของ Tab (Tab Methods)
* `Tab:Select()`: สลับมาเปิดแท็บนี้ทันที (ใช้เรียกที่แท็บแรกสุดตอนเริ่มสคริปต์)
* `Tab:SetBadge("ข้อความ")`: แสดงป้ายแท็กข้อความข้างชื่อแท็บ เช่น `Tabs.Main:SetBadge("v2.0")` หรือส่ง `nil` เพื่อซ่อน
* `Tab:SetName("ชื่อใหม่")`: เปลี่ยนชื่อแท็บแบบไดนามิก
* `Tab:SetImage("icon_name")`: เปลี่ยนไอคอนของแท็บ

---

## 5. ระบบจัดส่วน (Sections)

แต่ละแท็บสามารถแบ่งคอลัมน์ได้เป็นฝั่งซ้าย (`"Left"`) และฝั่งขวา (`"Right"`):

```lua
local LeftSection  = Tabs.Main:Section({ Side = "Left" })
local RightSection = Tabs.Main:Section({ Side = "Right" })
```

> **📱 Mobile Optimization:** บนจอมือถือที่มีความกว้างจำกัด Sections ทั้งสองฝั่งจะปรับขนาดเป็นแบบเต็มความกว้าง (Full-Width) อัตโนมัติ ทำให้ปุ่มและสวิตช์กดง่าย ไม่เบียดกัน

---

## 6. องค์ประกอบ UI ทั้งหมด (UI Components Reference)

### 6.1 Header & Label

```lua
-- Header: หัวข้อใหญ่แบ่งหมวดหมู่
LeftSection:Header({ Name = "Character Modifiers" })

-- Label: ข้อความอธิบายทั่วไป
local MyLabel = LeftSection:Label({ Text = "สถานะ: พร้อมทำงาน" })
MyLabel:UpdateText("สถานะ: กำลังฟาร์ม...") -- อัปเดตข้อความ
```

---

### 6.2 Button (ปุ่มกด)

```lua
local MyButton = LeftSection:Button({
    Name = "รีเซ็ตตัวละคร (Reset Character)",
    Callback = function()
        local char = game.Players.LocalPlayer.Character
        if char then char:BreakJoints() end
    end
})

-- เมธอด:
MyButton:UpdateName("ชื่อปุ่มใหม่")
```

---

### 6.3 Toggle (สวิตช์เปิด-ปิด)

```lua
local MyToggle = LeftSection:Toggle({
    Name = "เปิดระบบ Auto Farm",
    Default = false,
    Callback = function(state)
        print("Auto Farm State:", state)
    end
}, "AutoFarmFlag") -- Flag สำหรับระบบบันทึก Config

-- เมธอด:
MyToggle:SetState(true)           -- สั่งเปิดสวิตช์
local state = MyToggle:GetState() -- อ่านค่าสวิตช์ (true/false)
MyToggle:UpdateName("ชื่อใหม่")
MyToggle:SetVisibility(true)      -- ซ่อนหรือแสดงสวิตช์
```

---

### 6.4 Slider (แถบเลื่อนปรับค่า)

> **✨ ดีไซน์ใหม่ 2-Row:** แถวบนแสดงชื่อและกล่องพิมพ์ตัวเลข แถวล่างเป็นแถบเลื่อนเต็มความกว้าง รองรับทั้งการแตะนิ้วลากบนทัชสกรีน และการคลิกเมาส์ พร้อมระบบป้องกันค่าผิดพลาดอย่างสมบูรณ์

```lua
local MySlider = LeftSection:Slider({
    Name = "ความเร็วเดิน (WalkSpeed)",
    Default = 16,
    Minimum = 16,
    Maximum = 150,
    Precision = 0,               -- จำนวนทศนิยม (0 = จำนวนเต็ม)
    DisplayMethod = "Value",     -- "Value", "Percent", หรือ "Degrees"
    Prefix = "",                 -- ข้อความนำหน้า (เช่น "$ ")
    Suffix = " studs/s",         -- ข้อความต่อท้าย
    Callback = function(val)
        local hum = game.Players.LocalPlayer.Character:FindFirstChildOfClass("Humanoid")
        if hum then hum.WalkSpeed = val end
    end,
    onInputComplete = function(finalVal)
        print("ผู้เล่นปล่อยมือที่ค่า:", finalVal)
    end
}, "WalkSpeedSliderFlag")

-- เมธอด:
MySlider:SetValue(32)         -- ปรับค่าด้วยสคริปต์
local val = MySlider:GetValue()
MySlider:UpdateName("ชื่อใหม่")
```

---

### 6.5 Dropdown (เมนูเลือกตัวเลือก)

#### Dropdown แบบเลือกเดี่ยว (Single Select):
```lua
local WeaponDropdown = LeftSection:Dropdown({
    Name = "เลือกอาวุธหลัก",
    Options = {"ดาบ (Katana)", "ปืน (Rifle)", "มีด (Dagger)", "ธนู (Bow)"},
    Default = 1,                 -- ลำดับที่เลือกเริ่มต้น หรือใส่เป็นชื่อ "ดาบ (Katana)"
    Multi = false,               -- โหมดเลือกชอยส์เดียว
    Required = true,             -- บังคับต้องมีตัวเลือกเสมอ ห้ามว่าง
    Callback = function(chosen)
        print("เลือกอาวุธ:", chosen)
    end
}, "WeaponDropdownFlag")
```

#### Dropdown แบบเลือกหลายรายการ + ค้นหาได้ (Multi-Select with Search):
```lua
local BuffsDropdown = LeftSection:Dropdown({
    Name = "เลือกบัฟที่ต้องการ",
    Options = {"Health Boost", "Speed Buff", "Damage x2", "Invincible", "Night Vision"},
    Default = {"Health Boost"},  -- ตารางตัวเลือกเริ่มต้น
    Multi = true,                -- อนุญาตให้เลือกได้หลายข้อพร้อมกัน
    Search = true,               -- แสดงกล่อง Search ค้นหาตัวเลือกแบบเรียลไทม์
    Required = false,
    Callback = function(selectedTable)
        -- selectedTable จะเป็น Dictionary เช่น { ["Health Boost"] = true, ["Speed Buff"] = true }
        for buffName, isActive in pairs(selectedTable) do
            if isActive then
                print("Active buff:", buffName)
            end
        end
    end
}, "BuffsDropdownFlag")

-- เมธอด:
WeaponDropdown:SetValues({"ดาบใหม่", "ปืนกล", "ไม้เท้า"}, 1) -- อัปเดตรายการใหม่ทั้งหมด
WeaponDropdown:Refresh({"ตัวเลือก 1", "ตัวเลือก 2"})
local current = WeaponDropdown:GetSelected()
```

---

### 6.6 Input (กล่องกรอกข้อความ)

```lua
local MyInput = LeftSection:Input({
    Name = "ชื่อผู้เล่นเป้าหมาย",
    Placeholder = "พิมพ์ชื่อที่นี่...",
    AcceptedCharacters = "All",  -- "All", "Numbers" (เฉพาะตัวเลข), หรือ "Letters"
    Callback = function(text)
        print("ข้อความที่พิมพ์:", text)
    end,
    onInputComplete = function(text)
        print("เมื่อพิมพ์เสร็จและกดยืนยัน:", text)
    end
}, "TargetInputFlag")

-- เมธอด:
MyInput:SetValue("Player1")
local text = MyInput:GetValue()
```

---

### 6.7 Keybind (ปุ่มคีย์ลัด)

```lua
local MyKeybind = RightSection:Keybind({
    Name = "ปุ่มลัดวาร์ป (Teleport Key)",
    Default = Enum.KeyCode.F,
    Blacklist = { Enum.KeyCode.W, Enum.KeyCode.A, Enum.KeyCode.S, Enum.KeyCode.D }, -- ปุ่มต้องห้าม
    Callback = function()
        print("กดปุ่มลัด F!")
    end,
    onChanged = function(newKey)
        print("เปลี่ยนปุ่มลัดเป็น:", newKey.Name)
    end
}, "TeleportKeybindFlag")

-- เมธอด:
MyKeybind:SetKey(Enum.KeyCode.E)
local key = MyKeybind:GetKey()
```

---

### 6.8 Colorpicker (กล่องเลือกสี)

```lua
local MyColor = RightSection:Colorpicker({
    Name = "สีเส้น ESP (ESP Box Color)",
    Default = Color3.fromRGB(255, 0, 128),
    Callback = function(color)
        print("เลือกสี:", color)
    end
}, "ESPColorFlag")

-- เมธอด:
MyColor:SetColor(Color3.fromRGB(0, 255, 0))
local col = MyColor:GetColor()
```

---

## 7. ระบบบันทึกการตั้งค่า (Configuration & Auto Save System)

Maclib มีระบบบันทึก Config อัตโนมัติลงใน Workspace Executor โดยใช้ Folder ตามที่ระบุ:

```lua
-- 1. ตั้งชื่อโฟลเดอร์สำหรับเก็บไฟล์ config ของ Hub เรา
MacLib:SetFolder("MyHubSettings")

-- 2. แทรกหมวดจัดการ Config ใน Section ที่ต้องการ (เช่น ในแท็บ Settings)
Tabs.Settings:InsertConfigSection("Left")
```

คำสั่งนี้คำนวณและสร้าง UI จัดการ Config ครบวงจรให้ทันที (มีกล่องใส่ชื่อ Config, ปุ่ม Save, Load, Overwrite, Delete และ Auto-load Config เริ่มต้น)

#### เมธอดจัดการ Config ผ่านสคริปต์:
* `MacLib:SaveConfig("config_name")`: บันทึกการตั้งค่าปัจจุบัน
* `MacLib:LoadConfig("config_name")`: โหลดการตั้งค่าจากไฟล์
* `MacLib:DeleteConfig("config_name")`: ลบไฟล์การตั้งค่า
* `MacLib:GetConfigs()`: ดึงรายชื่อไฟล์การตั้งค่าทั้งหมดที่บันทึกไว้

---

## 8. ระบบรองรับมือถือและ Emulator อัตโนมัติ (Mobile Engine)

Maclib v2.0 มาพร้อมระบบตรวจจับแพลตฟอร์มขั้นสูงที่พัฒนาโดย TomTamX:

### 8.1 การทำงานของระบบตรวจจับอัตโนมัติ
* ระบบเรียก `UserInputService:GetPlatform()` ร่วมกับ `TouchEnabled`:
  * หากรันบน **Android จริง, iOS, แท็บเล็ต** $\rightarrow$ โหมดมือถือทำงาน
  * หากรันบน **MuMu Player, BlueStacks, LDPlayer (Android Emulators)** แม้จะต่อคีย์บอร์ดและเมาส์ $\rightarrow$ ระบบยังคงตรวจจับว่าเป็น Android และเปิดโหมดมือถือให้อัตโนมัติ!
  * หากรันบน **Windows PC ทั่วไป** $\rightarrow$ โหมด PC ทำงาน (ซ่อนปุ่มลอยเพื่อความสะอาดตา)

### 8.2 คุณสมบัติของปุ่มลอย (Floating Toggle Button)
* **Smooth Drag & Single-Tap Protection:** ผู้เล่นสามารถใช้นิ้วลากปุ่มลอยไปไว้มุมไหนของจอก็ได้ และหากการลากมีระยะขยับไม่เกิน 8 พิกเซล ตัวปุ่มจะนับเป็นการ "แตะคลิก" เพื่อเปิด/ปิด UI โดยไม่เด้งหลุด
* **Custom Glowing Icon:** ใช้ไอคอนโลโก้ตัว **T เรืองแสง (`105412598184757`)** ที่คมชัดระดับ HD
* **Auto Responsive Scale:** ย่อขนาดหน้าต่างให้พอดีกับความละเอียดของจอมือถืออัตโนมัติ ไม่ล้นขอบจอ

---

## 9. ตัวอย่างสคริปต์ฉบับสมบูรณ์ (Full Working Example)

คัดลอกโค้ดนี้ไปรันเป็น Template เริ่มต้นได้ทันที:

```lua
-- โหลด Maclib v2.0
local MacLib = loadstring(game:HttpGet("https://raw.githubusercontent.com/NongTham/Maclib/main/maclib.lua?" .. tostring(os.time())))()

-- สร้างหน้าต่างหลัก (รองรับมือถือและ PC อัตโนมัติ ไม่ต้องตั้งค่าเพิ่ม)
local Window = MacLib:Window({
    Title = "Nexus Hub",
    Subtitle = "Universal Edition • by TomTamX",
    Size = UDim2.fromOffset(860, 580),
    DragStyle = 1,
    DisabledWindowControls = {},
    ShowUserInfo = true,
    Keybind = Enum.KeyCode.RightControl,
    AcrylicBlur = true,
    AccentColor = MacLib.Themes.Blue,
})

-- สร้างกลุ่มแท็บ
local TabGroups = {
    Main = Window:TabGroup()
}

-- สร้างแท็บเมนู
local Tabs = {
    Main     = TabGroups.Main:Tab({ Name = "หน้าหลัก", Image = "home" }),
    Visuals  = TabGroups.Main:Tab({ Name = "การมองเห็น", Image = "eye" }),
    Settings = TabGroups.Main:Tab({ Name = "ตั้งค่า", Image = "settings" })
}

Tabs.Main:SetBadge("v2.0")

-- // ==========================================
-- // แท็บ 1: หน้าหลัก (Main)
-- // ==========================================
local mainLeft = Tabs.Main:Section({ Side = "Left" })
mainLeft:Header({ Name = "การเคลื่อนที่ (Movement)" })

mainLeft:Toggle({
    Name = "เปิดความเร็วเดินพิเศษ",
    Default = false,
    Callback = function(enabled)
        local hum = game.Players.LocalPlayer.Character and game.Players.LocalPlayer.Character:FindFirstChildOfClass("Humanoid")
        if hum then
            hum.WalkSpeed = enabled and 32 or 16
        end
    end
}, "WalkSpeedToggle")

mainLeft:Slider({
    Name = "ปรับความเร็ว (WalkSpeed)",
    Default = 32,
    Minimum = 16,
    Maximum = 120,
    Precision = 0,
    DisplayMethod = "Value",
    Suffix = " studs",
    Callback = function(val)
        -- อัปเดตความเร็ว
    end
}, "WalkSpeedVal")

local mainRight = Tabs.Main:Section({ Side = "Right" })
mainRight:Header({ Name = "การกระทำ (Actions)" })

mainRight:Button({
    Name = "แจ้งเตือนทดสอบ (Test Notification)",
    Callback = function()
        Window:Notify({
            Title = "Maclib v2.0",
            Description = "ระบบทำงานได้อย่างสมบูรณ์แบบ!",
            Lifetime = 3
        })
    end
})

-- // ==========================================
-- // แท็บ 3: ตั้งค่า (Settings & Config)
-- // ==========================================
MacLib:SetFolder("NexusHubConfig")
Tabs.Settings:InsertConfigSection("Left")

local settingsRight = Tabs.Settings:Section({ Side = "Right" })
settingsRight:Header({ Name = "การจัดการหน้าต่าง" })

settingsRight:Button({
    Name = "ถอนการติดตั้ง UI (Unload)",
    Callback = function()
        Window:Unload()
    end
})

-- สลับเปิดแท็บแรกเริ่มต้น
Tabs.Main:Select()
```
