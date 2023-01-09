import Swiper from 'react-native-swiper';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CalenderData from './data.json';
import { styled } from "nativewind";

import GunatitSwami from "./assets/GunatitSwami.png";
import AYMLogo from "./assets/AYMLogo.png";
import kite from "./assets/kite.png";
import yogijiMaharaj from "./assets/yogijiMaharaj.png";
import shastrijiMaharaj from "./assets/shastrijiMaharaj.png";
import gopalanadSwami from "./assets/gopalanadSwami.png";
import shiv from "./assets/shiv.png";
import bhagatji from "./assets/bhagatji.png";
import maharaj from "./assets/maharaj.png";

//import { Month } from './Month';

function dataUpdater(date) {
    //console.log(date);
}

const StyledText = styled(Text);
const StyledView = styled(View);

function Month(props) {
    let dataDivided = [];
    let tempData = [];
    let counter = props.data.startEmpty;
    for (let i = 0; i < props.data.startEmpty; i++) {
        tempData.push(["", "empty", "", ""])
    }
    for (let date in props.data) {
        if (!isNaN(date)) {
            try {
                if (props.data[date].type == "imageDate") {
                    let image = props.data[date].data[0] === "GunatitSwami.png" ? GunatitSwami
                        : props.data[date].data[0] === "AYMLogo.png" ? AYMLogo
                            : props.data[date].data[0] === "kite.png" ? kite
                                : props.data[date].data[0] === "yogijiMaharaj.png" ? yogijiMaharaj
                                    : props.data[date].data[0] === "shastrijiMaharaj.png" ? shastrijiMaharaj
                                        : props.data[date].data[0] === "gopalanadSwami.png" ? gopalanadSwami
                                            : props.data[date].data[0] === "shiv.png" ? shiv
                                                : props.data[date].data[0] === "bhagatji.png" ? bhagatji
                                                    : props.data[date].data[0] === "maharaj.png" ? maharaj
                                                        : require('./assets/SHA_logo.png');
                    tempData.push([date, props.data[date].type, image, props.data[date].data[1]])
                }
                else {
                    tempData.push([date, props.data[date].type, props.data[date].data[0], props.data[date].data[1]])
                }

            }
            catch (err) {
                if (props.data[date].type == "imageDate") {
                    let image = props.data[date].data[0] === "GunatitSwami.png" ? GunatitSwami
                        : props.data[date].data[0] === "AYMLogo.png" ? AYMLogo
                            : props.data[date].data[0] === "kite.png" ? kite
                                : props.data[date].data[0] === "yogijiMaharaj.png" ? yogijiMaharaj
                                    : props.data[date].data[0] === "shastrijiMaharaj.png" ? shastrijiMaharaj
                                        : props.data[date].data[0] === "gopalanadSwami.png" ? gopalanadSwami
                                            : props.data[date].data[0] === "shiv.png" ? shiv
                                                : props.data[date].data[0] === "bhagatji.png" ? bhagatji
                                                    : props.data[date].data[0] === "maharaj.png" ? maharaj
                                                        : require('./assets/SHA_logo.png');
                    tempData.push([date, props.data[date].type, image, ""])
                }
                else {
                    tempData.push([date, props.data[date].type, props.data[date].data[0], ""])
                }

            }
            counter++;
            if (counter == 7) {
                dataDivided.push(tempData)
                counter = 0
                tempData = [];
            }
        }
    }
    for (let i = 0; i < props.data.endEmpty; i++) {
        tempData.push(["", "empty", "", ""])
    }
    dataDivided.push(tempData)

    return (
        <StyledView className="h-fit w-full px-3">
            {
                dataDivided.map(row => (
                    <StyledView className="flex flex-row w-full justify-between">
                        {
                            row.map(date => (
                                <TouchableOpacity onPress={dataUpdater(date[0] + "/" + props.month + "/" + props.year)}>
                                    <StyledView className="w-12 text-center h-20 border-2 border-white rounded-lg hover:border-[#f79433] transition-all duration-200 py-1 text-auto text-slate-800 overflow-hidden text-clip">
                                        {
                                            date[1] === "normalDate" ? (
                                                <>
                                                    <StyledText numberOfLines={1} className='text-center text-xl font-bold'>{date[0]}</StyledText>
                                                    <StyledText numberOfLines={1} className="text-xs text-slate-500">{date[2]}</StyledText>
                                                </>
                                            ) : date[1] === "imageDate" ? (
                                                <>
                                                    <StyledText numberOfLines={1} className='text-center text-xl font-bold'>{date[0]}</StyledText>
                                                    <Image source={date[2]} className="p-1 h-10 w-10 mx-auto object-cover" />
                                                </>
                                            ) : date[1] === "multipleDate" ? (
                                                <>
                                                    <StyledText numberOfLines={1} className='text-center text-xl font-bold overflow-hidden'>{date[0]}</StyledText>
                                                    <StyledText numberOfLines={1} className="text-xs text-center text-slate-500 overflow-hidden">{date[2]}</StyledText>
                                                    <StyledText numberOfLines={1} className="text-[8px] text-center leading-3 text-blue-500 overflow-hidden">{date[3]}</StyledText>
                                                </>
                                            ) : date[1] === "templeDate" ? (
                                                <>
                                                    <StyledText numberOfLines={1} className='text-center text-xl font-bold'>{date[0]}</StyledText>
                                                    <Image className="p-1 h-10 w-10 mx-auto object-cover" source={require('./assets/SHA_logo.png')} />
                                                </>
                                            ) : (
                                                <Text>{date[0]}</Text>
                                            )
                                        }
                                    </StyledView>
                                </TouchableOpacity>
                            ))}
                    </StyledView>
                ))
            }
        </StyledView>
    )
}

export function Calender() {
    var myloop = [];
    for (let year in CalenderData) {
        for (let month in CalenderData[year]) {
            let tempMonth = <StyledView>
                <StyledView className="w-full mt-2 mb-2">
                    <StyledText className="w-full text-center align-middle py-1-xl font-bold text-slate-800 text-xl">{month} {year}</StyledText>
                    <StyledText className="w-full text-center align-middle py-1-sm text-slate-500">{CalenderData[year][month]["GujName"]}</StyledText>
                </StyledView>
                <StyledView className="flex flex-row w-full h-fit justify-between px-3">
                    <StyledText className="w-[100/7] text-center text-blue-500 font-bold text-lg">Mon</StyledText>
                    <StyledText className="w-[100/7] text-center text-blue-500 font-bold text-lg">Tue</StyledText>
                    <StyledText className="w-[100/7] text-center text-blue-500 font-bold text-lg">Wed</StyledText>
                    <StyledText className="w-[100/7] text-center text-blue-500 font-bold text-lg">Thu</StyledText>
                    <StyledText className="w-[100/7] text-center text-blue-500 font-bold text-lg">Fri</StyledText>
                    <StyledText className="w-[100/7] text-center text-blue-500 font-bold text-lg">Sat</StyledText>
                    <StyledText className="w-[100/7] text-center text-blue-500 font-bold text-lg">Sun</StyledText>
                </StyledView>
                <Month data={CalenderData[year][month]} month={month} year={year} />
            </StyledView>;
            myloop.push(tempMonth);
        }
    }
    return (
        <Swiper pagination={false} className="h-[600px]">{myloop}</Swiper>
    );
}