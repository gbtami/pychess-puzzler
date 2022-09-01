# 1000. tsume from qinoa collection
# https://syougi.qinoa.com/ja/game/play?pl=b&op=tume&bd=k8888868888888868a88888868888j8x8688888x88888t8wq18888888x88f8888ux88h88w88x8h888aabbaaaaabbbbb&rf=qinoa.jp

PIECES = {
    "a": "K",
    "b": "R",
    "c": "B",
    "d": "G",
    "e": "S",
    "f": "N",
    "g": "L",
    "h": "P",
    "i": "-",
    "j": "+R",
    "k": "+B",
    "l": "-",
    "m": "+S",
    "n": "+N",
    "o": "+L",
    "p": "+P",
    "q": "k",
    "r": "r",
    "s": "b",
    "t": "g",
    "u": "s",
    "v": "n",
    "w": "l",
    "x": "p",
    "y": "-",
    "z": "+r",
    "1": "+b",
    "2": "-",
    "3": "+s",
    "4": "+n",
    "5": "+l",
    "6": "+p",
    "7": "-",  # ???
    "8": "",  # empty square
}


def get_placement(text):
    board = [["-"] * 9 for i in range(9)]
    col = 8
    row = 0

    for i, char in enumerate(text):
        board[row][col] = PIECES[char]

        row += 1
        if i % 9 == 8:
            row = 0
            col -= 1

    placement = []
    for row in board:
        empty = 0
        for char in row:
            if char:
                if empty > 0:
                    placement.append(str(empty))
                    empty = 0
                placement.append(char)
            else:
                empty += 1
        if empty > 0:
            placement.append(str(empty))
        placement.append("/")

    return "".join(placement).rstrip("/")


def get_pocket(txt, color):
    # "a=0, b=1, c=2, ..."
    pieces = "rbgsnlp"
    pocket = ""
    for i, char in enumerate(txt):
        piece = pieces[i]
        count = ord(char) - ord("a")
        pocket += piece * count

    if color == "w":
        return pocket.upper()
    else:
        return pocket


with open("syougi_qinoa_com-ja-tume1000-v20210328.txt") as f:
    i = 0
    for line in f:
        txt, tsume = line.split()

        # header line
        if len(tsume) != 95:
            continue

        i += 1

        placement = get_placement(tsume[:81])
        wpocket = get_pocket(tsume[81:][:7], "w")
        bpocket = get_pocket(tsume[81:][7:], "b")

        fen = "%s[%s%s] w;variant shogi;site https://syougi.qinoa.com/ja/" % (placement, wpocket, bpocket)
        # print(tsume)
        print(fen)
