function getId(e) {
    return document.getElementById(e)
}
function Element(tag, parent, id) {
    var p = document.createElement(tag)
    parent.appendChild(p)
    if(id !== undefined) {
        p.id = id
    }
    return p
}
var consul = {
    errormessage: 'consul.element needs to be defined with consul.setElement()',
    setElement: function(e) { this.element = e; this.element.className = 'consul-element'},
    log: function(item) {
        if(item === undefined) {
            throw new Error('consul.log() must have something to log')
        } else {
            if(this.element === undefined) {
                throw new Error(this.errormessage)
            } else {
                var p = new Element('p', this.element)
                p.className = 'consul-item'
                p.innerHTML = item
                this.element.scrollTop = this.element.scrollHeight
            }
        }
        return p
    },
    error: function(item) {
        if(this.element === undefined) {
            throw new Error(this.errormessage)
        } else {
            consul.log("> " + item).style.color = '#b71c1c'
        }
    },
    style: function() {
        if(this.element === undefined) {
            throw new Error(this.errormessage)
        } else {
            var styleTag = document.createElement('style')
            document.body.appendChild(styleTag)
            styleTag.innerHTML += ".consul-element{color:"+this.fontColor+";font-size:24px;border:3px solid "+this.styleColor+"; padding:15px; border-radius:1.5px;} .consul-item{padding:0; padding:4px; padding-left:8px; cursor:default;} .consul-input{height:48px; padding:4px; border:3px solid "+this.accentColor+"; border-radius:2px; width: "+this.width+"px; font-size:24px;}"
        }
    },
    create: function(element, height, width, background, styleColor, accentColor, fontColor) {
        this.width = width
        this.height = height
        this.background = background
        this.accentColor = accentColor
        this.fontColor = fontColor
        this.styleColor = styleColor
        if(element !== undefined) {
            var p = new Element('div', document.body)
            var q = new Element('div', document.body)
            this.container = q;
            this.container.className = 'consul-container'
            p.height = height
            p.width = width
            q.appendChild(p)
            this.setElement(p)
            this.style()
            this.element.style.backgroundColor = this.background
            this.element.style.overflowY = 'auto'
            if(width !== undefined || height !== undefined) {
                this.element.style.width = width
                this.element.style.height = height*0.86
            } else {
                throw new Error('Height and width must be defined.')
                return false;
            }
            return this
        } else {
            throw new Error('consul.create() must have an element specified to create a consul')
            return false;
        }
    },
    title: function(e) {
        if(e === undefined) {
            throw new Error('consul title cannot be blank')
        } else {
            var p = new Element('p', this.element, 'consul-title')
            var fontsize = this.element.style.fontSize.toString().replace('px', '')
            p.style.fontSize = fontsize + 'px';
            p.style.padding = '0'
            p.style.paddingBottom = '4px'
            p.style.paddingTop = '6px'
            p.style.border = '4px double ' + this.styleColor
            p.style.borderRight = '4px solid ' + this.styleColor
            p.style.borderTop = null
            p.style.position = 'sticky'
            p.style.backgroundColor = this.background
            p.style.top = '0'
            p.style.opacity = '0.75'
            p.style.boxShadow = '-1.5px 1px 2px ' + this.accentColor
            p.innerHTML = e
            return p
        }
    },
    input: function(callback) {
        if(callback === undefined) {
            throw new Error('consul.input() needs a callback')
        }
        if(this.element === undefined) {
            throw new Error(this.errormessage)
        } else {
            var p = new Element('input', this.element)
            this.container.appendChild(p)
            p.type = 'text'
            p.autofocus = 'true'
            p.style.padding = '2px'
            p.style.marginTop = '10px'
            p.className = 'consul-input'
            
            p.addEventListener('keypress', function(e) {
                if(e.keyCode === 13) {
                    this.in = p.value
                    p.value = ''
                    callback(this.in.toString())
                } else if(e.keyCode === 38) {
                    p.value = this.in
                }
            })
            return p
        }
    },
    emphasis: function(e) {
        consul.log('> ' + e + ' <').style.color = '#ab47bc'
    },
    header: function(e) {
        consul.log(e).style.fontSize = '36px'
    },
    info: function(e) {
        consul.log('--> ' + e).style.color = '#039be5'
    },
    warning: function(e) {
        consul.log(e).style.textDecoration = 'underline'
    },
    shadow: function(e) {
        var p = consul.log(e)
        p.style.textShadow = '2px 2px 3px #0288d1'
    }
}
