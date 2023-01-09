import { Animated, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { styled, useColorScheme } from "nativewind";
import Svg, { Rect, G, Path } from "react-native-svg";
import React, { useRef, useEffect, useState } from 'react';
import CalenderData from './data.json';
import Swiper from 'react-native-swiper';
import GunatitSwami from "./assets/GunatitSwami.png";
import AYMLogo from "./assets/AYMLogo.png";
import kite from "./assets/kite.png";
import yogijiMaharaj from "./assets/yogijiMaharaj.png";
import shastrijiMaharaj from "./assets/shastrijiMaharaj.png";
import gopalanadSwami from "./assets/gopalanadSwami.png";
import shiv from "./assets/shiv.png";
import bhagatji from "./assets/bhagatji.png";
import maharaj from "./assets/maharaj.png";

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
								<TouchableOpacity onPress={date[1] != "empty" ? (props.onPress) : (() => { })} >
									{/* onPress={dataUpdater(date[0] + "/" + props.month + "/" + props.year)} */}
									<StyledView className="w-12 text-center h-20 border-2 border-white rounded-lg hover:border-[#f79433] transition-all duration-200 py-1 text-auto text-slate-800 overflow-hidden text-clip">
										{
											date[1] === "normalDate" ? (
												<>
													<StyledText numberOfLines={1} className='text-center text-xl font-bold'>{date[0]}</StyledText>
													<StyledText numberOfLines={1} className="text-xs text-center text-slate-500">{date[2]}</StyledText>
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

function Calender(props) {
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
				<Month data={CalenderData[year][month]} month={month} year={year} onPress={props.onPress} />
			</StyledView>;
			myloop.push(tempMonth);
		}
	}
	return (
		<Swiper pagination={false} className="h-[600px]">{myloop}</Swiper>
	);
}

export default function App() {
	const TransformView = (props) => {
		const transformAnim = useRef(new Animated.Value(0)).current
		useEffect(() => {
			setTimeout(() => {
				Animated.timing(
					transformAnim,
					{
						toValue: -10000,
						duration: 3000,
						useNativeDriver: true,
					}
				).start();
			}, 3000);
		}, [transformAnim])
		return (
			<Animated.View
				style={{
					...props.style,
					transform: [{ translateY: transformAnim }]
				}}
			>
				{props.children}
			</Animated.View>
		);
	}
	const { colorScheme, setColorScheme } = useColorScheme("dark");
	const [message, setMessage] = useState([]);
	const tempData = []

	for (let i in message) {
		tempData.push(<StyledView className="rounded-lg border text-md border-l-[6px] border-slate-500 shadow-lg mx-5 py-1 px-3 mt-3"><StyledText>{message.i}</StyledText></StyledView>)
	}
	function dataUpdater(event) {
		console.log(event.target);
	}

	return (
		<SafeAreaView className="overflow-hidden relative bg-[#f79433] dark:bg-slate-900">
			<StyledView className="bg-[#f79433] dark:bg-slate-900 h-fit pb-3 sticky top-0 z-40 drop-shadow-2xl">
				<StyledText className="text-white font-bold text-2xl w-full text-center pt-3">Haridham Calender</StyledText>
				<Svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="white" className="absolute top-3 left-2" viewBox="0 0 16 16">
					<Path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
				</Svg>
				<TouchableOpacity onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")} className="absolute right-2 top-3 items-center p-2 mr-2 text-xs font-medium text-gray-700 rounded-lg bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
					<Svg aria-hidden="true" data-toggle-icon="moon" className="w-4 h-4 block dark:hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
						<Path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586z" />
					</Svg>
					<Svg aria-hidden="true" data-toggle-icon="sun" className="w-4 h-4 hidden dark:block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
						<Path d="M10 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm4 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-.464 4.95.707.707a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 0-1.414 1.414zm2.12-10.607a1 1 0 0 1 0 1.414l-.706.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM17 11a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2" fillRule="evenodd" clipRule="evenodd" />
					</Svg>
					<StyledText className="sr-only">Toggle dark/light mode</StyledText>
				</TouchableOpacity>
			</StyledView>
			<ScrollView className="z-40 h-full w-full bg-white" stickyHeaderIndices={[0]} alwaysBounceVertical="true">
				<Calender onPress={dataUpdater} />
				<StyledView className="w-full h-fit pb-5 z-40 border-t border-gray-400 bg-white mb-5">
					<StyledView className="flex flex-row justify-between py-3 mx-5">
						<StyledText className="bg-red-200 px-5 text-red-800 rounded-lg border border-red-800 pt-1">Info</StyledText>
						<StyledText className="text-xl dark:text-white">3 - 1 - 2023</StyledText>
						<StyledText className="bg-blue-200 px-5 text-blue-800 rounded-lg border border-blue-800 pt-1">Today</StyledText>
					</StyledView>
					<StyledView className="relative h-full mb-5">
						{/* <StyledView className="rounded-lg border text-md border-l-[6px] border-slate-500 shadow-lg mx-5 py-1 px-3 mt-3"><StyledText>3 - Posh Sud Baras</StyledText></StyledView>
						<StyledView className="rounded-lg border text-md border-l-[6px] border-orange-400 shadow-lg mx-5 py-1 px-3 mt-2"><StyledText>3 - Posh Sud Baras</StyledText></StyledView>
						<StyledView className="rounded-lg border text-md border-l-[6px] border-orange-400 shadow-lg mx-5 py-1 px-3 mt-2"><StyledText>3 - Posh Sud Baras</StyledText></StyledView>
						<StyledView className="rounded-lg border text-md border-l-[6px] border-blue-500 shadow-lg mx-5 py-1 px-3 mt-2"><StyledText>3 - Posh Sud Baras</StyledText></StyledView>
						<StyledView className="rounded-lg border text-md border-l-[6px] border-blue-500 shadow-lg mx-5 py-1 px-3 mt-2"><StyledText>3 - Posh Sud Baras</StyledText></StyledView> */}
						{tempData}
					</StyledView>
				</StyledView>
			</ScrollView>
			<TransformView style={{ width: "100%", height: "100%", backgroundColor: 'white', position: "absolute", top: 0, left: 0, zIndex: 999 }}>
				<Image className="h-screen w-screen object-cover" source={require('./assets/loading.png')} />
			</TransformView>
		</SafeAreaView >
	);
}

{/* <StyledView>
	<StyledView className="w-full mt-2 mb-2">
		<StyledText className="w-full text-center align-middle py-1-xl font-bold text-slate-800">{month} {year}</StyledText>
		<StyledText className="w-full text-center align-middle py-1-sm text-slate-500">{month["GujName"]}</StyledText>
	</StyledView>
	<StyledView className="flex flex-row w-full h-fit justify-between px-3">
		<StyledText className="w-auto text-center text-blue-500 font-bold text-lg">Mon</StyledText>
		<StyledText className="w-auto text-center text-blue-500 font-bold text-lg">Tue</StyledText>
		<StyledText className="w-auto text-center text-blue-500 font-bold text-lg">Wed</StyledText>
		<StyledText className="w-auto text-center text-blue-500 font-bold text-lg">Thu</StyledText>
		<StyledText className="w-auto text-center text-blue-500 font-bold text-lg">Fri</StyledText>
		<StyledText className="w-auto text-center text-blue-500 font-bold text-lg">Sat</StyledText>
		<StyledText className="w-auto text-center text-blue-500 font-bold text-lg">Sun</StyledText>
	</StyledView>
	<StyledView className="flex flex-row w-full h-full justify-between px-3">
		{() => { return (<StyledText className="w-auto text-center text-blue-500 font-bold text-lg">How do you do</StyledText>) }}
		{Object.keys(CalenderData["2023"][month]).map((day) => (
			<StyledText className="w-auto text-center text-blue-500 font-bold text-lg">{day}</StyledText>
		))}
	</StyledView>
</StyledView> */}