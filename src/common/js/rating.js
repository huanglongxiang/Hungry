// 评论页公共部分抽取
let ALL = 2
export default {
    data() {
        return {
            selectType: ALL,
            onlyContent: false,
            desc: {
              all: '全部',
              positive: '推荐',
              negative: '吐槽'
            }
        }
    },
    computed: {
        // 返回没有文本的评论
        computedRatings() {
            let ret = []
            this.ratings.forEach(rating => {
                // 过滤两个条件都有选择
                if (this.onlyContent && !rating.text) {
                    return
                }
                // 判定全部，与选中的
                if (this.selectType === ALL || this.selectType === rating.rateType) {
                    ret.push(rating)
                }
            })
            return ret
        }
    },
    methods: {
        alterSelect(type) {
            this.selectType = type
        },
        alertContent(flag) {
            this.onlyContent = !flag
        }
    }
}
