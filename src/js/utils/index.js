export const getCssClassNames = (startsWith, target, onlyRoot = true) => {
    const classes = []

    if (!document.styleSheets || !Object.keys(document.styleSheets).length) {
        return classes
    }

    for (const styleSheet of document.styleSheets) {
        if (!styleSheet.href || !styleSheet.href.split('?')[0].endsWith(target)) {
            continue
        }

        if (Object.keys(styleSheet.rules).length) {
            for (const rule of styleSheet.rules) {
                let name = rule.selectorText

                if (!name || name.indexOf('.') !== 0 || name.indexOf(',') !== -1) {
                    continue
                }

                name = name.substring(1)

                if (onlyRoot && name.indexOf('.') !== -1) {
                    continue
                }

                name = onlyRoot ? [name] : name.split('.')

                name.forEach((value) => {
                    if ((!startsWith || value.startsWith(startsWith)) && !classes.includes(value)) {
                        classes.push(value)
                    }
                })
            }
        }

        break
    }

    return classes
}
