
/* 색상 혹은 색상 팔레트를 이용한 글로벌한 정의가 필요한 스타일이 있을 때 사용합니다

** 사용법
    - ThemeProvider를 import 합니다
    - 모든 컴포넌트를 ThemeProvider에 연결해야 합니다
    - 컴포넌트에 props로 글로벌 정의한 스타일을 가져옵니다
*/
const theme = {
    //Black & white
    black: "#000000FF",
    white: "#FFFFFFFF",

    // backGround
    backGround_1: "#F8F4F0FF",
    backGround_main: "#FCF9F6FF",
    backGround_2: "#E7E1DBFF",
    backGround_3: "#AAA7A4FF",

    // brand1
    brand1_1: "#FFEFEEFF",
    brand1_2: "#FFDFDEFF",
    brand1_3: "#FFCFCEFF",
    brand1_4: "#FFBFBEFF",
    brand1_5: "#FFAFAEFF",
    brand1_main: "#FF9F9FFF",

    // brand2
    brand2_1: "#FFE6EEFF",
    brand2_2: "#FFCCDEFF",
    brand2_3: "#FFB2CEFF",
    brand2_4: "#FF97BEFF",
    brand2_5: "#FF7AAEFF",
    brand2_main: "#FF599FFF",

    // brand3
    brand3_1: "#FFECEFFF",
    brand3_2: "#FFDADFFF",
    brand3_3: "#FFC7CFFF",
    brand3_4: "#FFB4BFFF",
    brand3_5: "#FFA0B0FF",
    brand3_main: "#FF8CA1FF",

    // brand4
    brand4_1: "#FAE3E5FF",
    brand4_2: "#F3C7CBFF",
    brand4_3: "#ECABB1FF",
    brand4_4: "#E28F99FF",
    brand4_5: "#D87381FF",
    brand4_main: "#CC556AFF",

    // font(burgundy)
    font_burgundy_20: "#CC556AFF",
    font_burgundy_30: "#CC556AFF",
    font_burgundy_40: "#CC556AFF",
    font_burgundy_50: "#CC556AFF",
    font_burgundy_60: "#CC556AFF",
    font_burgundy_70: "#CC556AFF",
    font_burgundy_80: "#CC556AFF",
    font_burgundy_90: "#CC556AFF",
    font_burgundy_main: "#CC556AFF",

    // font(gray)
    font_gray_20: "#454545FF",
    font_gray_30: "#454545FF",
    font_gray_40: "#454545FF",
    font_gray_50: "#454545FF",
    font_gray_60: "#454545FF",
    font_gray_70: "#454545FF",
    font_gray_80: "#454545FF",
    font_gray_90: "#454545FF",
    font_gray_main: "#454545FF",

    //point1
    point1_1: "#ECE3FAFF",
    point1_2: "#D8C7F6FF",
    point1_3: "#C3ABF0FF",
    point1_4: "#AD90EBFF",
    point1_5: "#9675E5FF",
    point1_main: "#7D5BDFFF",

    //etc.
    main: "#FF599FFF",
    main_3: "#FFDEDEFF",
    main_color: "#FF7474FF",
    blue_main: "#599CFFFF",
    fontcolor: "#CC556AFF",
    line: "#E04B66FF",
    main3: "#FF8CA1FF"
};

const size = [
    8,
    16,
    24,
    32,
    /** 임시 설정 */
];

export default theme;
export default size;