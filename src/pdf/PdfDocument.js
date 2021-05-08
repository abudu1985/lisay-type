import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";
import pic from "../pictures/officework.jpg";

const styles = StyleSheet.create({
    resultDetails: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 20
    },
    resultTitle: {
        fontSize: 15,
        marginBottom: 10
    },
    image: {
        objectFit: 'cover',
    },
});

export function PdfDocument(props) {
    const { typedWords, minutes } = props;
    const wpm = typedWords / minutes;
    return (
        <Document>
            <Page >
            <View style={styles.resultDetails}>
                            <Text style={styles.resultTitle}>minutes: {minutes.toFixed(2)}</Text>
                            <Text style={styles.resultTitle}>words: {typedWords}</Text>
                            <Text style={styles.resultTitle}>{`Words Per Minute is ${wpm.toFixed(2)}`}</Text>
                    </View>
                    <Image style={styles.image}  src={pic} alt="images" />
            </Page>
        </Document>
    );
}